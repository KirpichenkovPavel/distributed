package ru.spbpu.bean;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spbpu.entity.PcItem;
import ru.spbpu.entity.Storage;
import ru.spbpu.exception.NotFoundException;
import ru.spbpu.repository.PcComponentRepository;
import ru.spbpu.repository.PcItemRepository;
import ru.spbpu.repository.StorageRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class StorageManager {

  private final StorageRepository storageRepository;
  private final PcItemRepository itemRepository;
  private final PcComponentRepository componentRepository;

  @Autowired
  StorageManager(
      StorageRepository storageRepository,
      PcItemRepository itemRepository,
      PcComponentRepository componentRepository
  ) {
    this.storageRepository = storageRepository;
    this.itemRepository = itemRepository;
    this.componentRepository = componentRepository;
  }

  public void createStorage(String name) throws IllegalArgumentException {
    if (!storageRepository.getByName(name).isPresent()) {
      storageRepository.save(new Storage(name));
    }
  }

  public Optional<Storage> getStorage(String storageName) {
    return storageRepository.getByName(storageName);
  }

  public Optional<Storage> getStorage(Long id) {
    return storageRepository.getById(id);
  }

  public List<PcItem> getItemsInStorage(Storage storage) {
    return itemRepository.findAllByStorage(storage);
  }

  public List<PcItem> getItemsInStorage(String storageName) {
    Optional<Storage> storage = storageRepository.getByName(storageName);
    return storage
        .map(itemRepository::findAllByStorage)
        .orElse(new ArrayList<>());
  }

  public List<PcItem> getItemsInStorage(Long storageId) {
    Storage storage = storageRepository.getById(storageId).orElseThrow(NotFoundException::new);
    return itemRepository.findAllByStorage(storage);
  }

  public void putItemsInStorage(Storage storage, List<PcItem> items) {
    items.forEach(newItem -> {
      PcItem itemInStorage = storage.getItems().get(newItem.getComponent());
      if (itemInStorage != null) {
        itemInStorage.setAmount(itemInStorage.getAmount() + newItem.getAmount());
        itemRepository.save(itemInStorage);
      } else {
        storage.getItems().put(newItem.getComponent(), newItem);
        newItem.setStorage(storage);
        itemRepository.save(newItem);
      }
    });
    storageRepository.save(storage);
  }
}
