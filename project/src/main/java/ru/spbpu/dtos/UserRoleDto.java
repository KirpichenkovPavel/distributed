package ru.spbpu.dtos;

public class UserRoleDto {
  private String name;
  private String role;

  public UserRoleDto() {
  }

  public UserRoleDto(String name, String role) {
    this.name = name;
    this.role = role;
  }

  public String getName() {
    return name;
  }

  public String getRole() {
    return role;
  }
}
