package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spbpu.entities.PcComponent;
import ru.spbpu.repositories.PcComponentRepository;

import java.util.List;

@Component
public class PcComponentList {

  private final
  PcComponentRepository componentRepository;

  @Autowired
  public PcComponentList(PcComponentRepository componentRepository) {
    this.componentRepository = componentRepository;
  }

  public List<PcComponent> getAllComponentsWithName(String name) {
    return componentRepository.findByName(name);
  }

  public void createComponent(PcComponent newComponent) {
    componentRepository.save(newComponent);
  }
}
