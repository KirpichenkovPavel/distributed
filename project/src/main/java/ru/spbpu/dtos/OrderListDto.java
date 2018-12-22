package ru.spbpu.dtos;

import ru.spbpu.entities.Order;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class OrderListDto {
  private int page;
  private int last;
  private List<OrderListItemDto> orders;

  private OrderListDto() {
  }

  public OrderListDto(List<Order> orderList, int page, int last) {
    this.page = page;
    this.last = last;
    this.orders = orderList
        .stream()
        .map(order -> new OrderListItemDto(
            order.getId(),
            order.getCreated(),
            order.getStatus().getName()))
        .collect(Collectors.toList());
  }

  public int getPage() {
    return page;
  }

  public List<OrderListItemDto> getOrders() {
    return orders;
  }

  public int getLast() {
    return last;
  }

  public static OrderListDto empty() {
    return new OrderListDto(new ArrayList<>(), 0, 0);
  }
}
