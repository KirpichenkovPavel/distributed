package ru.spbpu.dtos;

import ru.spbpu.entities.PcComponent;

public class ComponentDto {
  private String name;
  private String description;

  public ComponentDto() {
  }

  public ComponentDto(PcComponent component) {
    this.name = component.getName();
    this.description = component.getDescription();
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
