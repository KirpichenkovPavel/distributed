package ru.spbpu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entity.PcComponent;

import java.util.Optional;

public interface PcComponentRepository extends JpaRepository<PcComponent, Long> {

  Optional<PcComponent> findFirstByName(String name);
}
