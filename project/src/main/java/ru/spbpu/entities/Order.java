package ru.spbpu.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "order", schema = "public")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @OneToOne
  private User from;

  @OneToOne
  private User to;

  @OneToOne
  private Storage storage;

  @OneToOne
  private OrderStatus status;

  @OneToMany(mappedBy = "order")
  private List<PcItem> itemList;

  @Temporal(TemporalType.TIMESTAMP)
  private Date created;

  public Order() {
  }

  public Order(User from, Storage storage) {
    this.from = from;
    this.storage = storage;
  }

  public long getId() {
    return id;
  }

  public Storage getStorage() {
    return storage;
  }

  public OrderStatus getStatus() {
    return status;
  }

  public List<PcItem> getItemList() {
    return itemList;
  }

  public User getFrom() {
    return from;
  }

  public User getTo() {
    return to;
  }

  public void setFrom(User from) {
    this.from = from;
  }

  public void setStatus(OrderStatus status) {
    this.status = status;
  }

  public void setStorage(Storage storage) {
    this.storage = storage;
  }

  public void setItemList(List<PcItem> itemList) {
    this.itemList = itemList;
  }

  public Date getCreated() {
    return created;
  }

  @PrePersist
  protected void onCreate() {
    created = new Date();
  }
}
