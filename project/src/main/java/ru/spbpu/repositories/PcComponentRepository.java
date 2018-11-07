package ru.spbpu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.PcComponent;

import java.util.List;

public interface PcComponentRepository extends JpaRepository<PcComponent, Long> {

  List<PcComponent> findByName(String name);
}
