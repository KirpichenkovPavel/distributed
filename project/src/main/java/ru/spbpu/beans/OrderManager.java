package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Pair;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import ru.spbpu.entities.*;
import ru.spbpu.exceptions.BadRequestException;
import ru.spbpu.exceptions.ServerErrorException;
import ru.spbpu.repositories.OrderRepository;
import ru.spbpu.repositories.OrderStatusRepository;
import ru.spbpu.repositories.PcItemRepository;
import ru.spbpu.repositories.StorageRepository;

import java.util.List;
import java.util.Optional;

@Component
public class OrderManager {

  private OrderStatusRepository orderStatusRepository;
  private OrderRepository orderRepository;
  private PcItemRepository itemRepository;
  private StorageRepository storageRepository;
  private OrderManager() {
  }

  @Autowired
  public OrderManager(
      OrderStatusRepository orderStatusRepository,
      OrderRepository orderRepository,
      PcItemRepository itemRepository,
      StorageRepository storageRepository
  ) {
    this.orderStatusRepository = orderStatusRepository;
    this.orderRepository = orderRepository;
    this.itemRepository = itemRepository;
    this.storageRepository = storageRepository;
  }

  public Order createNewOrder(User from, Storage storage, List<PcItem> items) {
    Order newOrder = new Order(from, storage);
    OrderStatus status = orderStatusRepository
        .getByName(OrderStatus.NEW)
        .orElseThrow(ServerErrorException::new);
    newOrder.setStatus(status);
    orderRepository.save(newOrder);
    for (PcItem i: items) {
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
}
