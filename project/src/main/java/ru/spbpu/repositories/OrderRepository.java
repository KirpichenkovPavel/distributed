package ru.spbpu.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.Order;
import ru.spbpu.entities.OrderStatus;
import ru.spbpu.entities.Payment;
import ru.spbpu.entities.User;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
  Page<Order> findAllByFromOrderByCreated(User from, Pageable pageable);
  Page<Order> findAllByFromAndStatusOrderByCreated(User from, OrderStatus status, Pageable pageable);
  Page<Order> findAllByStorageUsersOrderByCreated(User user, Pageable pageable);
  Page<Order> findAllByStorageUsersAndStatusOrderByCreated(
      User user, OrderStatus status, Pageable pageable
  );
  Optional<Order> findByPayment(Payment payment);
}
