package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Pair;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import ru.spbpu.entities.*;
import ru.spbpu.exceptions.BadRequestException;
import ru.spbpu.exceptions.NotFoundException;
import ru.spbpu.exceptions.PermissionDeniedException;
import ru.spbpu.exceptions.ServerErrorException;
import ru.spbpu.repositories.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class OrderManager {

  private OrderStatusRepository orderStatusRepository;
  private OrderRepository orderRepository;
  private PcItemRepository itemRepository;
  private StorageRepository storageRepository;
  private PaymentStatusRepository paymentStatusRepository;
  private PaymentRepository paymentRepository;

  private OrderManager() {
  }

  @Autowired
  public OrderManager(
      OrderStatusRepository orderStatusRepository,
      OrderRepository orderRepository,
      PcItemRepository itemRepository,
      StorageRepository storageRepository,
      PaymentStatusRepository paymentStatusRepository,
      PaymentRepository paymentRepository
  ) {
    this.orderStatusRepository = orderStatusRepository;
    this.orderRepository = orderRepository;
    this.itemRepository = itemRepository;
    this.storageRepository = storageRepository;
    this.paymentStatusRepository = paymentStatusRepository;
    this.paymentRepository = paymentRepository;
  }

  public Order createNewOrder(User from, Storage storage, List<PcItem> items) {
    Order newOrder = new Order(from, storage);
    OrderStatus status = orderStatusRepository
        .getByName(OrderStatus.NEW)
        .orElseThrow(ServerErrorException::new);
    newOrder.setStatus(status);
    orderRepository.save(newOrder);
    for (PcItem i : items) {
      i.setOrder(newOrder);
      i.setPrice(itemRepository
          .findFirstByStorageAndComponent(storage, i.getComponent())
          .orElseThrow(BadRequestException::new)
          .getPrice());
      itemRepository.save(i);
    }
    return newOrder;
  }

  public Pair<List<Order>, Integer> getOrderListPageMadeByUser(
      User user, @Nullable OrderStatus maybeStatus, int page
  ) {
    Page<Order> orderPage;
    if (maybeStatus != null) {
      orderPage = orderRepository.findAllByFromAndStatusOrderByCreated(
          user, maybeStatus, PageRequest.of(page, 20)
      );
    } else {
      orderPage = orderRepository.findAllByFromOrderByCreated(
          user, PageRequest.of(page, 20)
      );
    }
    List<Order> orders = orderPage.getContent();
    Integer last = Math.max(orderPage.getTotalPages() - 1, 0);
    return Pair.of(orders, last);
  }

  public Pair<List<Order>, Integer> getOrderListPageManageableByUser(
      User user, OrderStatus maybeStatus, int page
  ) {
    Page<Order> orderPage;
    if (maybeStatus != null) {
      orderPage = orderRepository.findAllByStorageUsersAndStatusOrderByCreated(
          user, maybeStatus, PageRequest.of(page, 20)
      );
    } else {
      orderPage = orderRepository.findAllByStorageUsersOrderByCreated(
          user, PageRequest.of(page, 20)
      );
    }
    return Pair.of(
        orderPage.getContent(),
        Math.max(orderPage.getTotalPages() - 1, 0)
    );
  }

  public Optional<OrderStatus> getStatus(String statusName) {
    return orderStatusRepository.getByName(statusName);
  }

  public Order getOrder(long id, User user) {
    Order order = orderRepository.findById(id).orElseThrow(NotFoundException::new);
    if (!hasPermission(user, order)) {
      throw new PermissionDeniedException();
    }
    return order;
  }

  public Payment getPayment(long id, User user) {
    Payment payment = paymentRepository.findById(id).orElseThrow(NotFoundException::new);
    if (!hasPermission(user, payment)) {
      throw new PermissionDeniedException();
    }
    return payment;
  }

  public Payment makePayment(Payment payment) {
    payment.setStatus(
        paymentStatusRepository
            .findByName(PaymentStatus.DONE)
            .orElseThrow(ServerErrorException::new)
    );
    paymentRepository.save(payment);
    Order order = orderRepository.findByPayment(payment).orElseThrow(ServerErrorException::new);
    order.setStatus(
        orderStatusRepository
            .getByName(OrderStatus.PAID)
            .orElseThrow(ServerErrorException::new)
    );
    orderRepository.save(order);
    return payment;
  }

  private boolean hasPermission(User user, Order order) {
    return order.getFrom().equals(user)
        || order.getTo() != null && order.getTo().equals(user)
        || storageRepository.getAllByUsers(user).contains(order.getStorage());
  }

  private boolean hasPermission(User user, Payment payment) {
    return payment.getFrom().equals(user)
        && payment.getStatus().getName().equals(PaymentStatus.NEW);
  }

  public boolean canBeProceed(Order order, User user) {
    boolean allowedToCreator = order.getFrom().equals(user)
        && (Arrays.asList(OrderStatus.creatorProceedStatuses).contains(
            order.getStatus().getName())
    );
    boolean allowedToExecutor = (order.getTo() == null || order.getTo().equals(user))
        && (Arrays.asList(OrderStatus.executorProceedStatuses).contains(
            order.getStatus().getName())
    );
    return allowedToCreator || allowedToExecutor;
  }

  public boolean canBeCancelled(Order order, User user) {
    boolean allowedToCreator = order.getFrom().equals(user)
        && (Arrays.asList(OrderStatus.creatorCancellableStatuses).contains(
        order.getStatus().getName())
    );
    boolean allowedToExecutor = (order.getTo() == null || order.getTo().equals(user))
        && (Arrays.asList(OrderStatus.executorCancellableStatuses).contains(
        order.getStatus().getName())
    );
    return allowedToCreator || allowedToExecutor;
  }

  private boolean canBeAccepted(Order order) {
    return order.getItemList().stream().allMatch(pcItem ->  {
      PcItem itemInStorage = order.getStorage().getItems().get(pcItem.getComponent());
      return itemInStorage != null && itemInStorage.getAmount() >= pcItem.getAmount();
    });
  }

  private void removeItemsFromStorage(Order order) {
    for (PcItem itemInOrder: order.getItemList()) {
      PcItem itemInStorage = order.getStorage().getItems().get(itemInOrder.getComponent());
      if (itemInStorage == null) {
        throw new ServerErrorException();
      }
      itemInStorage.setAmount(itemInStorage.getAmount() - itemInOrder.getAmount());
      itemRepository.save(itemInStorage);
    }
  }

  private Payment addPayment(Order order, User user) {
    Payment payment = new Payment(
        order.getFrom(), user,
        getCost(order),
        paymentStatusRepository
            .findByName(PaymentStatus.NEW)
            .orElseThrow(ServerErrorException::new)
    );
    paymentRepository.save(payment);
    return payment;
  }

  private void operationsOnSubmittedOrder(Order order, User user) {
    if (!canBeAccepted(order)) {
      throw new BadRequestException();
    }
    order.setTo(user);
    order.setPayment(addPayment(order, user));
    removeItemsFromStorage(order);
  }

  public Order process(Order order, User user) {
    String status = order.getStatus().getName();
    List<String> orderList = Arrays.asList(OrderStatus.order);
    int ix = orderList.indexOf(status);
    if (ix >= 0 && ix < orderList.size() - 1) {
      String next = orderList.get(ix + 1);
      OrderStatus newStatus = orderStatusRepository
          .getByName(next)
          .orElseThrow(ServerErrorException::new);
      if (order.getStatus().getName().equals(OrderStatus.SUBMITTED)) {
        operationsOnSubmittedOrder(order, user);
      }
      order.setStatus(newStatus);
      orderRepository.save(order);
      return order;
    } else {
      throw new ServerErrorException();
    }
  }

  public Order cancel(Order order) {
    Payment payment = order.getPayment();
    if (payment != null) {
      cancelPayment(payment);
    }
    OrderStatus cancelled = orderStatusRepository
        .getByName(OrderStatus.CANCELLED)
        .orElseThrow(ServerErrorException::new);
    if (!order.getStatus().getName().equals(OrderStatus.NEW))
      returnItems(order);
    order.setStatus(cancelled);
    orderRepository.save(order);
    return order;
  }

  private void cancelPayment(Payment payment) {
    PaymentStatus cancelled = paymentStatusRepository
        .findByName(PaymentStatus.CANCELLED)
        .orElseThrow(ServerErrorException::new);
    payment.setStatus(cancelled);
    paymentRepository.save(payment);
  }

  private void returnItems(Order order) {
    for (PcItem itemInOrder: order.getItemList()) {
      PcItem itemInStorage = order.getStorage().getItems().get(itemInOrder.getComponent());
      if (itemInStorage == null) {
        throw new ServerErrorException();
      }
      itemInStorage.setAmount(itemInStorage.getAmount() + itemInOrder.getAmount());
      itemRepository.save(itemInStorage);
    }
  }

  private long getCost(Order order) {
    long sum = 0;
    for (PcItem i: order.getItemList()) {
      sum += i.getPrice() * i.getAmount();
    }
    return sum;
  }
}
