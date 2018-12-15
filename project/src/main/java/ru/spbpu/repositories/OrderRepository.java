package ru.spbpu.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.spbpu.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
