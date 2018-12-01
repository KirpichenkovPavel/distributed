package ru.spbpu.controllers;

import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbpu.beans.InventorizationManager;
import ru.spbpu.dtos.ComponentDto;
import ru.spbpu.entities.PcComponent;
import ru.spbpu.exceptions.BadRequestException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
  public Optional<PcComponent> getComponent(
      @RequestParam(value = "name", defaultValue = "") String name
  ) {
    return inventorizationManager.getComponentWithName(name);
  }

  @RequestMapping(value = "/component", method = RequestMethod.POST)
  public void addComponent(@RequestBody ComponentDto componentDto) {
    inventorizationManager.createComponent(componentDto.getName(), componentDto.getDescription());
  }

  @GetMapping("/component/list")
  public List<ComponentDto> getAllComponents(
      @RequestParam(value = "q", defaultValue = "") String q)
  {
    return inventorizationManager
        .getComponentsContaining(q)
        .stream()
        .map(ComponentDto::new)
        .collect(Collectors.toList());
  }
}
