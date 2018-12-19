package ru.spbpu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;
import ru.spbpu.beans.InventorizationManager;
import ru.spbpu.beans.OrderManager;
import ru.spbpu.beans.StorageManager;
import ru.spbpu.beans.UserManager;
import ru.spbpu.dtos.OrderDto;
import ru.spbpu.dtos.OrderListDto;
import ru.spbpu.entities.Order;
import ru.spbpu.entities.PcItem;
import ru.spbpu.entities.Storage;
import ru.spbpu.entities.User;
import ru.spbpu.exceptions.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class OrderController {

  private StorageManager storageManager;
  private OrderManager orderManager;
  private UserManager userManager;
  private InventorizationManager inventorizationManager;

  public OrderController() {
  }

  @Autowired
  public OrderController(
      StorageManager storageManager,
      OrderManager orderManager,
      UserManager userManager,
      InventorizationManager inventorizationManager
  ) {
    this.storageManager = storageManager;
    this.orderManager = orderManager;
    this.userManager = userManager;
    this.inventorizationManager = inventorizationManager;
  }

  @PostMapping("/order/new")
  @ResponseBody
  public Long newOrder(@RequestBody OrderDto orderDto) {
    String userName = orderDto.getUserName();
    User user = userManager
        .getUserByName(userName)
        .orElseThrow(NotFoundException::new);
    Storage storage = storageManager
        .getStorage(orderDto.getStorageId())
        .orElseThrow(NotFoundException::new);
    List<PcItem> itemsList = orderDto.getItems()
        .stream()
        .map(itemDto -> inventorizationManager.createItem(
            itemDto.getName(),
            itemDto.getAmount(),
            itemDto.getPrice())
        )
        .collect(Collectors.toList());
    return orderManager.createNewOrder(user, storage, itemsList).getId();
  }

  @GetMapping("/order/list")
  public OrderListDto orderList(
      @RequestParam(name = "userName") String userName,
      @RequestParam(name = "page", defaultValue = "0") int page
  ) {
    User user = userManager.getUserByName(userName).orElseThrow(NotFoundException::new);
    Pair<List<Order>, Integer> orders = orderManager.getOrderListPageForUser(user, page);
    return new OrderListDto(orders.getFirst(), page, orders.getSecond());
  }
}
