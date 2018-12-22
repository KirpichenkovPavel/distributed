package ru.spbpu.dtos;

import java.util.Date;

public class OrderListItemDto {
  private Long id;
  private Date created;
  private String status;

  private OrderListItemDto() {
  }

  public OrderListItemDto(Long id, Date created, String status) {
    this.created = created;
    this.id = id;
    this.status = status;
  }

  public Long getId() {
    return id;
  }

  public Date getCreated() {
    return created;
  }

  public String getStatus() {
    return status;
  }
}
