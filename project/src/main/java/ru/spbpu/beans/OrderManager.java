package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spbpu.dtos.ItemDto;
import ru.spbpu.dtos.OrderDto;
import ru.spbpu.entities.*;
import ru.spbpu.exceptions.BadRequestException;
import ru.spbpu.exceptions.ServerErrorException;
import ru.spbpu.repositories.OrderRepository;
import ru.spbpu.repositories.OrderStatusRepository;
import ru.spbpu.repositories.PcItemRepository;
import ru.spbpu.repositories.StorageRepository;

import java.util.List;

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

  public boolean createNewOrder(User from, Storage storage, List<PcItem> items) {
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
    return true;
  }
}
