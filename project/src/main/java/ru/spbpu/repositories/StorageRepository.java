package ru.spbpu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.Storage;

import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {

  Optional<Storage> getByName(String name);
  Optional<Storage> getById(Long id);
}
