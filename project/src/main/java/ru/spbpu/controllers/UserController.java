package ru.spbpu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.spbpu.beans.UserManager;
import ru.spbpu.dtos.UserDto;
import ru.spbpu.dtos.UserRoleDto;
import ru.spbpu.entities.Role;
import ru.spbpu.exceptions.BadRequestException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

  private UserManager userManager;

  @Autowired
  public UserController(UserManager userManager) {
    this.userManager = userManager;
  }

  @PostMapping("/user/add")
  public void createUser(@RequestBody UserDto user) {
    if (!userManager.createUser(user.getName())) {
      throw new BadRequestException("User name is not unique");
    }
  }

  @PostMapping("/user/roles/add")
  public void addRole(@RequestBody UserRoleDto userRoleInfo) {
    if (!userManager.addRole(userRoleInfo.getName(), userRoleInfo.getRole())) {
      throw new BadRequestException("Role information has errors");
    }
  }

  @GetMapping("/user/roles")
  public List<String> getRoles(@RequestParam String name) {
    return userManager
        .getUserRoles(name)
        .stream()
        .map(Role::getName)
        .collect(Collectors.toList());
  }
}
