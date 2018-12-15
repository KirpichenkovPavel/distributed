package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spbpu.entities.PcItem;
import ru.spbpu.entities.Role;
import ru.spbpu.entities.Storage;
import ru.spbpu.entities.User;
import ru.spbpu.exceptions.NotFoundException;
import ru.spbpu.repositories.PcComponentRepository;
import ru.spbpu.repositories.PcItemRepository;
import ru.spbpu.repositories.StorageRepository;

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
    if (!storageRepository.getByNameOrderByName(name).isPresent()) {
      storageRepository.save(new Storage(name));
    }
  }

  public Optional<Storage> getStorage(String storageName) {
    return storageRepository.getByNameOrderByName(storageName);
  }

  public Optional<Storage> getStorage(Long id) {
    return storageRepository.getById(id);
  }

  public List<PcItem> getItemsInStorage(Storage storage) {
    return itemRepository.findAllByStorageOrderByComponentName(storage);
  }

  public List<PcItem> getItemsInStorage(String storageName) {
    Optional<Storage> storage = storageRepository.getByNameOrderByName(storageName);
    return storage
        .map(itemRepository::findAllByStorageOrderByComponentName)
        .orElse(new ArrayList<>());
  }

  public List<PcItem> getItemsInStorage(Long storageId) {
    Storage storage = storageRepository.getById(storageId).orElseThrow(NotFoundException::new);
    return itemRepository.findAllByStorageOrderByComponentName(storage);
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

  public List<Storage> getAllStorages(User user) {
    return storageRepository.getAllByUsers(user);
  }

  public List<Storage> getAllStorages() {
    return storageRepository.findAll();
  }

  public List<Storage> getAllStorages(Role role) {
    if (role.equals(UserManager.MANAGER_ROLE)) {
      return storageRepository.getAllStoragesOwnedByUsersWithRole(
          UserManager.PROVIDER_ROLE.getName()
      );
    } else if (role.equals(UserManager.CLIENT_ROLE)) {
      return storageRepository.getAllStoragesOwnedByUsersWithRole(
          UserManager.MANAGER_ROLE.getName()
      );
    } else {
      return new ArrayList<>();
    }
  }
}
