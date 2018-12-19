package ru.spbpu.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.Order;
import ru.spbpu.entities.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
  Page<Order> findAllByFrom(User from, Pageable pageable);
}
