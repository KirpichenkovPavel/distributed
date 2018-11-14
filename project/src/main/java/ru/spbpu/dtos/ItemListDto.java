package ru.spbpu.dtos;

import java.util.List;

public class ItemListDto {
  private List<ItemDto> items;

  public ItemListDto() {
  }

  public ItemListDto(List<ItemDto> items) {
    this.items = items;
  }

  public List<ItemDto> getItems() {
    return items;
  }
}
