package ru.spbpu.entities;

import javax.persistence.*;

@Entity
@Table(name = "order_status", schema = "public")
public class OrderStatus {

  public static final String NEW = "new";
  public static final String SUBMITTED = "submitted";
  public static final String APPROVED = "approved";
  public static final String PAID = "paid";
  public static final String COMPLETE = "complete";
  public static final String CLOSED = "closed";
  public static final String CANCELLED = "cancelled";

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String name;

  public OrderStatus() {
  }

  public OrderStatus(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public long getId() {
    return id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setId(long id) {
    this.id = id;
  }
}
