package ru.spbpu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entity.PcItem;
import ru.spbpu.entity.Storage;

import java.util.List;

public interface PcItemRepository extends JpaRepository<PcItem, Long> {

  List<PcItem> getByComponentName(String componentName);
  List<PcItem> findAllByStorage(Storage storage);
}
