package ru.spbpu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.spbpu.beans.PcComponentList;
import ru.spbpu.entities.PcComponent;

import java.util.List;

@RestController
public class ComponentController {

  private final
  PcComponentList componentListManager;

  @Autowired
  public ComponentController(PcComponentList componentListManager) {
    this.componentListManager = componentListManager;
  }

  @RequestMapping("/component")
  public List<PcComponent> getComponents(@RequestParam(value = "name", defaultValue = "John") String name) {
    return componentListManager.getAllComponentsWithName(name);
  }

  @RequestMapping(value = "/component", method = RequestMethod.POST)
  public void addComponent(@RequestParam(value = "name") String name,
                           @RequestParam(value = "description", defaultValue = "") String description) {
    PcComponent newComponent = new PcComponent(name, description);
    componentListManager.createComponent(newComponent);
  }
}
