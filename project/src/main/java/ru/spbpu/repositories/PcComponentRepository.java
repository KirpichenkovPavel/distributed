package ru.spbpu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.PcComponent;

import java.util.List;
import java.util.Optional;

public interface PcComponentRepository extends JpaRepository<PcComponent, Long> {

  Optional<PcComponent> findFirstByName(String name);
  List<PcComponent> findAllByNameContainsOrDescriptionContains(String name, String description);
}
