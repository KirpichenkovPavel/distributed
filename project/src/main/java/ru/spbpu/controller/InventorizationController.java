package ru.spbpu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbpu.bean.InventorizationManager;
import ru.spbpu.dto.ComponentDto;
import ru.spbpu.entity.PcComponent;

import java.util.Optional;

@RestController
public class InventorizationController {

  private final InventorizationManager inventorizationManager;

  @Autowired
  public InventorizationController(
      InventorizationManager inventorizationManagerManager
  ) {
    this.inventorizationManager = inventorizationManagerManager;
  }

  @RequestMapping("/component")
  public Optional<PcComponent> getComponents(
      @RequestParam(value = "name", defaultValue = "") String name
  ) {
    return inventorizationManager.getComponentWithName(name);
  }

  @RequestMapping(value = "/component", method = RequestMethod.POST)
  public void addComponent(@RequestBody ComponentDto componentDto) {
    inventorizationManager.createComponent(componentDto.getName(), componentDto.getDescription());
  }
}
