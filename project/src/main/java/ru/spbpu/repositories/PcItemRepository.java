package ru.spbpu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.PcItem;
import ru.spbpu.entities.Storage;

import java.util.List;

public interface PcItemRepository extends JpaRepository<PcItem, Long> {

  List<PcItem> getByComponentName(String componentName);
  List<PcItem> findAllByStorageOrderByComponentName(Storage storage);
}
