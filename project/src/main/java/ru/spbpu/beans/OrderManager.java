package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spbpu.dtos.ItemDto;
import ru.spbpu.dtos.OrderDto;
import ru.spbpu.entities.*;
import ru.spbpu.exceptions.ServerErrorException;
import ru.spbpu.repositories.OrderRepository;
import ru.spbpu.repositories.OrderStatusRepository;
import ru.spbpu.repositories.PcItemRepository;

import java.util.List;

@Component
public class OrderManager {

  private OrderStatusRepository orderStatusRepository;
  private OrderRepository orderRepository;
  private PcItemRepository itemRepository;

  private OrderManager() {
  }

  @Autowired
  public OrderManager(
      OrderStatusRepository orderStatusRepository,
      OrderRepository orderRepository,
      PcItemRepository itemRepository
  ) {
    this.orderStatusRepository = orderStatusRepository;
    this.orderRepository = orderRepository;
    this.itemRepository = itemRepository;
  }

  public boolean createNewOrder(User from, Storage storage, List<PcItem> items) {
    Order newOrder = new Order(from, storage);
    OrderStatus status = orderStatusRepository
        .getByName(OrderStatus.NEW)
        .orElseThrow(ServerErrorException::new);
    newOrder.setStatus(status);
    orderRepository.save(newOrder);
    for (PcItem i: items) {
      i.setOrder(newOrder);
      itemRepository.save(i);
    }
    return true;
  }
}
