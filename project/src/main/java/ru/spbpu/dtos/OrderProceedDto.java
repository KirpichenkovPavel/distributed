package ru.spbpu.dtos;

public class OrderProceedDto {
  private long id;
  private String userName;
  private Long storageId;

  private OrderProceedDto() {
  }

  public OrderProceedDto(long id, String userName, Long storageId) {
    this.id = id;
    this.userName = userName;
    this.storageId = storageId;
  }

  public long getId() {
    return id;
  }

  public String getUserName() {
    return userName;
  }

  public Long getStorageId() {
    return storageId;
  }
}
