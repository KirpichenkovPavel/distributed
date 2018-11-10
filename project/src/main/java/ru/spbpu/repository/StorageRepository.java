package ru.spbpu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entity.PcItem;
import ru.spbpu.entity.Storage;

import java.util.List;
import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {

  Optional<Storage> getByName(String name);
  Optional<Storage> getById(Long id);
}
