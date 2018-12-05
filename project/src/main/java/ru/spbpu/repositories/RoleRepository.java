package ru.spbpu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.Role;
import ru.spbpu.entities.User;

import java.util.Optional;
import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, Long> {

  Set<Role> findAllByUsers(User user);
  Optional<Role> findByName(String name);
}
