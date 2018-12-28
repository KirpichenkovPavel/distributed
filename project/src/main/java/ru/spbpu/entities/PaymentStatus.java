package ru.spbpu.entities;

import javax.persistence.*;

@Entity
@Table(name = "payment_status")
public class PaymentStatus {

  public static final String NEW = "new";
  public static final String DONE = "done";
  public static final String CANCELLED = "cancelled";

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
