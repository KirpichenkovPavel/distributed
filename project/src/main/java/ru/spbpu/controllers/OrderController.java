package ru.spbpu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;
import ru.spbpu.beans.InventorizationManager;
import ru.spbpu.beans.OrderManager;
import ru.spbpu.beans.StorageManager;
import ru.spbpu.beans.UserManager;
import ru.spbpu.dtos.OrderCreateDto;
import ru.spbpu.dtos.OrderListDto;
import ru.spbpu.entities.*;
import ru.spbpu.exceptions.NotFoundException;
import ru.spbpu.exceptions.PermissionDeniedException;

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
  public Long newOrder(@RequestBody OrderCreateDto orderCreateDto) {
    String userName = orderCreateDto.getUserName();
    User user = userManager
        .getUserByName(userName)
        .orElseThrow(NotFoundException::new);
    Storage storage = storageManager
        .getStorage(orderCreateDto.getStorageId())
        .orElseThrow(NotFoundException::new);
    List<PcItem> itemsList = orderCreateDto.getItems()
        .stream()
        .map(itemDto -> inventorizationManager.createItem(
            itemDto.getName(),
            itemDto.getAmount(),
            itemDto.getPrice())
        )
        .collect(Collectors.toList());
    return orderManager.createNewOrder(user, storage, itemsList).getId();
  }

  @GetMapping("/order/list/my")
  public OrderListDto orderList(
      @RequestParam(name = "userName") String userName,
      @RequestParam(name = "page", defaultValue = "0") int page,
      @RequestParam(name = "status", defaultValue = "") String status
  ) {
    User user = userManager.getUserByName(userName).orElseThrow(NotFoundException::new);
    OrderStatus maybeStatus = orderManager.getStatus(status).orElse(null);
    Pair<List<Order>, Integer> orders = orderManager.getOrderListPageMadeByUser(user, maybeStatus, page);
    return new OrderListDto(orders.getFirst(), page, orders.getSecond());
  }

  @GetMapping("/order/list/{role}")
  public OrderListDto orderList(
      @PathVariable String role,
      @RequestParam String userName,
      @RequestParam(name = "status", defaultValue = "") String statusName,
      @RequestParam(defaultValue = "0") int page
  ) {
    User user = userManager
        .getUserByName(userName)
        .orElseThrow(NotFoundException::new);
    if (!userManager.hasRole(userName, role)) {
      throw new PermissionDeniedException();
    }
    OrderStatus status = orderManager.getStatus(statusName).orElse(null);
    Pair<List<Order>, Integer> orders =
        orderManager.getOrderListPageManageableByUser(user, status, page);
    return new OrderListDto(orders.getFirst(), page, orders.getSecond());
  }
}
