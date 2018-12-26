package ru.spbpu.dtos;

public class OrderProceedDto {
  private long id;
  private String userName;

  private OrderProceedDto() {
  }

  public OrderProceedDto(long id, String userName) {
    this.id = id;
    this.userName = userName;
  }

  public long getId() {
    return id;
  }

  public String getUserName() {
    return userName;
  }
}
