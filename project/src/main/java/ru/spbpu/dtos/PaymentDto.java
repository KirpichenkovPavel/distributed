package ru.spbpu.dtos;

import ru.spbpu.entities.Payment;

public class PaymentDto {
  private long id;
  private String from;
  private String to;
  private Long amount;
  private String status;

  private PaymentDto() {
  }

  public PaymentDto(Payment payment) {
    this.id = payment.getId();
    this.from = payment.getFrom().getName();
    this.to = payment.getTo().getName();
    this.amount = payment.getAmount();
    this.status = payment.getStatus().getName();
  }

  public long getId() {
    return id;
  }

  public String getFrom() {
    return from;
  }

  public String getTo() {
    return to;
  }

  public Long getAmount() {
    return amount;
  }

  public String getStatus() {
    return status;
  }
}
