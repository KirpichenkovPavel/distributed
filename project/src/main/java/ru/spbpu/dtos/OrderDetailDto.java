package ru.spbpu.dtos;

import ru.spbpu.entities.Order;
import ru.spbpu.entities.Payment;
import ru.spbpu.entities.User;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDetailDto {
  private long id;
  private String from;
  private String to;
  private Date created;
  private StorageDto storage;
  private PaymentDto payment;
  private List<ItemDto> items;
  private String status;

  private OrderDetailDto() {
  }

  public OrderDetailDto(Order order) {
    this.id = order.getId();
    User from = order.getFrom();
    this.from =
        from == null
        ? null
        : from.getName();
    User to = order.getTo();
    this.to = to == null ? null : to.getName();
    this.created = order.getCreated();
    this.storage = new StorageDto(order.getStorage());
    Payment payment = order.getPayment();
    this.payment = payment == null ? null : new PaymentDto(payment);
    this.items = order.getItemList()
        .stream()
        .map(ItemDto::new)
        .collect(Collectors.toList());
    this.status = order.getStatus().getName();
  }

  public long getId() {
    return id;
  }

  public String getFrom() {
    return from;
  }

  public String getTo() {
    return to;
  }

  public Date getCreated() {
    return created;
  }

  public PaymentDto getPayment() {
    return payment;
  }

  public StorageDto getStorage() {
    return storage;
  }

  public List<ItemDto> getItems() {
    return items;
  }

  public String getStatus() {
    return status;
  }
}
