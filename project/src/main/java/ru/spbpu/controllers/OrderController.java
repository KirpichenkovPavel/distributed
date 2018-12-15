package ru.spbpu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.spbpu.beans.InventorizationManager;
import ru.spbpu.beans.OrderManager;
import ru.spbpu.beans.StorageManager;
import ru.spbpu.beans.UserManager;
import ru.spbpu.dtos.OrderDto;
import ru.spbpu.entities.PcItem;
import ru.spbpu.entities.Storage;
import ru.spbpu.entities.User;
import ru.spbpu.exceptions.BadRequestException;
import ru.spbpu.exceptions.NotFoundException;
import ru.spbpu.exceptions.ServerErrorException;

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
  public void newOrder(@RequestBody OrderDto orderDto) {
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
    if (!orderManager.createNewOrder(user, storage, itemsList)) {
      throw new BadRequestException();
    }
  }
}
