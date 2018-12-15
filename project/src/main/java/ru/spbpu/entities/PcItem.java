package ru.spbpu.entities;

import javax.persistence.*;

@Entity
@Table(name = "item")
public class PcItem {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  private PcComponent component;

  private int amount;

  private int price;

  @ManyToOne
  private Storage storage;

  @ManyToOne
  private Order order;

  private PcItem() {
  }

  public PcItem(PcComponent component, int amount, int price) {
    this.component = component;
    this.amount = amount;
    this.price = price;
  }

  public PcItem(PcComponent component, int amount) {
    this(component, amount, 0);
  }

  public PcItem(PcComponent component) {
    this(component, 1, 0);
  }

  public void setComponent(PcComponent component) {
    this.component = component;
  }

  public void setAmount(int amount) {
    this.amount = amount;
  }

  public int getAmount() {
    return amount;
  }

  public PcComponent getComponent() {
    return component;
  }

  public void setPrice(int price) {
    this.price = price;
  }

  public int getPrice() {
    return price;
  }

  public void setStorage(Storage storage) {
    this.storage = storage;
  }

  public Storage getStorage() {
    return storage;
  }

  public Order getOrder() {
    return order;
  }

  public Long getId() {
    return id;
  }

  public void setOrder(Order order) {
    this.order = order;
  }
}
