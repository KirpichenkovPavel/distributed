package ru.spbpu.controller;

import org.springframework.web.bind.annotation.*;
import ru.spbpu.bean.StorageManager;
import ru.spbpu.dto.ItemDto;
import ru.spbpu.dto.ItemListDto;
import ru.spbpu.entity.PcItem;
import ru.spbpu.entity.Storage;
import ru.spbpu.exception.BadRequestException;
import ru.spbpu.exception.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class StorageController {

  private final StorageManager storageManager;
  private final Conversions conversions;

  public StorageController(
      StorageManager storageManager,
      Conversions conversions
  ) {
    this.storageManager = storageManager;
    this.conversions = conversions;
  }

  @PostMapping("/storage/create")
  public void createStorage(@RequestBody String name) {
    storageManager.createStorage(name);
  }

  @GetMapping("/storage/{id}/items")
  @ResponseBody
  public List<ItemDto> itemsList(@PathVariable("id") Long storageId) {
    List<PcItem> items = storageManager.getItemsInStorage(storageId);
    return items
        .stream()
        .map(ItemDto::new)
        .collect(Collectors.toList());
  }

  @PostMapping("/storage/{id}/items/add")
  public void putItems(
      @PathVariable("id") Long storageId,
      @RequestBody List<ItemDto> newItems
  ) {
    Storage storage = storageManager
        .getStorage(storageId)
        .orElseThrow(NotFoundException::new);
    List<PcItem> items = newItems
        .stream()
        .map(dto -> conversions.toEntity(dto).orElseThrow(BadRequestException::new))
        .collect(Collectors.toList());
    storageManager.putItemsInStorage(storage, items);
  }
}
