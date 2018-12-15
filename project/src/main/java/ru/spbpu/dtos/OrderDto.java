package ru.spbpu.dtos;

import java.util.List;

public class OrderDto {
  private String userName;
  private long storageId;
  private List<ItemDto> items;

  private OrderDto() {
  }

  public OrderDto(String userName, long storageId, List<ItemDto> items) {
    this.userName = userName;
    this.storageId = storageId;
    this.items = items;
  }

  public long getStorageId() {
    return storageId;
  }

  public List<ItemDto> getItems() {
    return items;
  }

  public String getUserName() {
    return userName;
  }
}
