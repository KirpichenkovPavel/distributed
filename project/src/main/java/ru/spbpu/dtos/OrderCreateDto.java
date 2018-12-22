package ru.spbpu.dtos;

import java.util.List;

public class OrderCreateDto {
  private String userName;
  private long storageId;
  private List<ItemDto> items;

  private OrderCreateDto() {
  }

  public OrderCreateDto(String userName, long storageId, List<ItemDto> items) {
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
