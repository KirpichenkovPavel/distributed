package ru.spbpu.entities;

import javax.persistence.*;

@Entity
@Table(name = "payment_status")
public class PaymentStatus {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String name;

  private PaymentStatus(){
  }

  public PaymentStatus(String name) {
    this.name = name;
  }

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }
}
