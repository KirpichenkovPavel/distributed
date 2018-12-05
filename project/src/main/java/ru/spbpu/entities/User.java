package ru.spbpu.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user", schema = "public")
public class User {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private long id;

  private String name;

  @ManyToMany(targetEntity = Role.class)
  @JoinTable(
      name = "user_role",
      joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private List<Role> roles;

  private User(){
  }

  public User(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public long getId() {
    return id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<Role> getRoles() {
    return roles;
  }
}
