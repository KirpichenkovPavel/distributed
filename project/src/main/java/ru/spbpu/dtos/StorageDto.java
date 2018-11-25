package ru.spbpu.dtos;

import ru.spbpu.entities.Storage;

public class StorageDto {

  private Long id;
  private String name;

  private StorageDto(){}

  public StorageDto(Storage storage) {
    this.id = storage.getId();
    this.name = storage.getName();
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }
}
