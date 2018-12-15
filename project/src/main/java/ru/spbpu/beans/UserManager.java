package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spbpu.entities.Role;
import ru.spbpu.entities.User;
import ru.spbpu.repositories.RoleRepository;
import ru.spbpu.repositories.UserRepository;

import java.util.*;

@Component
public class UserManager {

  public static final Role MANAGER_ROLE = new Role("manager");
  public static final Role CLIENT_ROLE = new Role("client");
  public static final Role PROVIDER_ROLE = new Role("provider");

  private RoleRepository roleRepository;
  private UserRepository userRepository;

  @Autowired
  public UserManager(RoleRepository roleRepository, UserRepository userRepository) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
  }

  public Optional<User> getUserByName(String userName) {
    return userRepository.getByName(userName);
  }

  public Optional<Role> getRoleByName(String name) {
    return roleRepository.findByName(name);
  }

  public Set<Role> getUserRoles(String userName) {
    Optional<User> user = getUserByName(userName);
    if (!user.isPresent()) {
      return new HashSet<>();
    } else {
      return roleRepository.findAllByUsers(user.get());
    }
  }

  public boolean hasRole(String userName, String roleName) {
    return getUserRoles(userName).stream().anyMatch(r -> r.getName().equals(roleName));
  }

  public boolean createUser(String userName) {
    if (getUserByName(userName).isPresent()) {
      return false;
    } else {
      userRepository.save(new User(userName));
      return true;
    }
  }

  public boolean addRole(String userName, String roleName) {
    Optional<User> maybeUser = userRepository.getByName(userName);
    if (!maybeUser.isPresent()) {
      return false;
    } else {
      Optional<Role> role = roleRepository.findByName(roleName);
      if (!role.isPresent()) {
        return false;
      }
      if (hasRole(userName, roleName)) {
        return false;
      } else {
        User user = maybeUser.get();
        user.getRoles().add(role.get());
        userRepository.save(user);
        return true;
      }
    }
  }
}
