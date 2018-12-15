package ru.spbpu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.spbpu.entities.Storage;
import ru.spbpu.entities.User;

import java.util.List;
import java.util.Optional;

public interface StorageRepository extends JpaRepository<Storage, Long> {

  List<Storage> getAllByUsers(User user);
  Optional<Storage> getByNameOrderByName(String name);
  Optional<Storage> getById(Long id);
  @Query("SELECT DISTINCT s from Storage s join s.users u join u.roles r where r.name = ?1")
  List<Storage> getAllStoragesOwnedByUsersWithRole(String roleName);
}
