package ru.spbpu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.PcComponent;
import ru.spbpu.entities.PcItem;
import ru.spbpu.entities.Storage;

import java.util.List;
import java.util.Optional;

public interface PcItemRepository extends JpaRepository<PcItem, Long> {

  List<PcItem> getByComponentName(String componentName);
  List<PcItem> findAllByStorageOrderByComponentName(Storage storage);
  Optional<PcItem> findFirstByStorageAndComponent(Storage storage, PcComponent component);
}
