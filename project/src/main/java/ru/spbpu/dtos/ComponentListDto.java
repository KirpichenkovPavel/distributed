package ru.spbpu.dtos;

import ru.spbpu.entities.PcComponent;

import java.util.List;
import java.util.stream.Collectors;

public class ComponentListDto {
  private List<ComponentDto> data;
  private int page;
  private int last;

  private ComponentListDto() {
  }

  public ComponentListDto(List<PcComponent> components, int page, int last) {
    this.data = components.stream()
        .map(ComponentDto::new)
        .collect(Collectors.toList());
    this.page = page;
    this.last = last;
  }

  public List<ComponentDto> getData() {
    return data;
  }

  public int getLast() {
    return last;
  }

  public int getPage() {
    return page;
  }
}
