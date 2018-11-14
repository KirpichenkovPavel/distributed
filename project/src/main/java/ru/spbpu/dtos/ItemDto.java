package ru.spbpu.dtos;

import ru.spbpu.entities.PcItem;

public class ItemDto {
  private String name;
  private int amount;
  private int price;

  public ItemDto() {
  }

  public ItemDto(
      String name,
      int amount,
      int price
      ) {
    this.name = name;
    this.amount = amount;
    this.price = price;
  }

  public ItemDto(PcItem item) {
    this.name = item.getComponent().getName();
    this.amount = item.getAmount();
    this.price = item.getPrice();
  }

  public int getAmount() {
    return amount;
  }

  public int getPrice() {
    return price;
  }

  public String getName() {
    return name;
  }
}
