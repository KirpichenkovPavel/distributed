package ru.spbpu.dtos;

public class UserDto {

  private String name;

  private UserDto() {
  }

  public UserDto(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
