package ru.spbpu.dtos;

import ru.spbpu.entities.Order;

import java.util.List;
import java.util.stream.Collectors;

public class OrderListDto {
  private int page;
  private int last;
  private List<Long> orderIds;

  private OrderListDto() {
  }

  public OrderListDto(List<Order> orderList, int page, int last) {
    this.page = page;
    this.last = last;
    this.orderIds = orderList
        .stream()
        .map(Order::getId)
        .collect(Collectors.toList());
  }

  public int getPage() {
    return page;
  }

  public List<Long> getOrderIds() {
    return orderIds;
  }

  public int getLast() {
    return last;
  }
}
