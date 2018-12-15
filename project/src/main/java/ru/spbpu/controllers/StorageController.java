package ru.spbpu.controllers;

import org.springframework.web.bind.annotation.*;
import ru.spbpu.beans.StorageManager;
import ru.spbpu.beans.UserManager;
import ru.spbpu.dtos.ItemDto;
import ru.spbpu.dtos.StorageDto;
import ru.spbpu.entities.PcItem;
import ru.spbpu.entities.Role;
import ru.spbpu.entities.Storage;
import ru.spbpu.entities.User;
import ru.spbpu.exceptions.BadRequestException;
import ru.spbpu.exceptions.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class StorageController {

  private final StorageManager storageManager;
  private final UserManager userManager;
  private final Conversions conversions;

  public StorageController(
      StorageManager storageManager,
      Conversions conversions,
      UserManager userManager
  ) {
    this.storageManager = storageManager;
    this.conversions = conversions;
    this.userManager = userManager;
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

  @GetMapping("/storage/list")
  @ResponseBody
  public List<StorageDto> getStorageList(@RequestParam String userName) {
    Optional<User> user = userManager
        .getUserByName(userName);
    if (!user.isPresent())
      return new ArrayList<>();
    return storageManager
        .getAllStorages(user.get())
        .stream()
        .map(StorageDto::new)
        .collect(Collectors.toList());
  }

  @GetMapping("/storage/list/read")
  @ResponseBody
  public List<StorageDto> getStoragesForRole(
      @RequestParam String roleName,
      @RequestParam String userName) {
    if (!userManager.hasRole(userName, roleName)) {
      return new ArrayList<>();
    } else {
      Role role = userManager.getRoleByName(roleName).get();
      return storageManager.getAllStorages(role)
          .stream()
          .map(StorageDto::new)
          .collect(Collectors.toList());
    }
  }
}
