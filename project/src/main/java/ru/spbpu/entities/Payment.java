package ru.spbpu.entities;

import javax.persistence.*;

@Entity
@Table(name = "payment", schema = "public")
public class Payment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @OneToOne
  private User from;

  @OneToOne
  private User to;

  private long amount;

  @OneToOne
  private PaymentStatus status;

  private Payment() {
  }

  public Payment(User from, User to, Long amount, PaymentStatus status) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.status = status;
  }

  public long getId() {
    return id;
  }

  public User getFrom() {
    return from;
  }

  public User getTo() {
    return to;
  }

  public PaymentStatus getStatus() {
    return status;
  }

  public Long getAmount() {
    return amount;
  }

  public void setStatus(PaymentStatus status) {
    this.status = status;
  }
}
