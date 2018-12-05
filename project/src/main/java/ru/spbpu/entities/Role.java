package ru.spbpu.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "role")
public class Role {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;

  private String name;

  @ManyToMany(mappedBy = "roles")
  private List<User> users;

  private Role() {
  }

  public Role(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public Long getId() {
    return id;
  }

  @Override
  public boolean equals(Object o) {
    return o instanceof Role && ((Role) o).getName().equals(getName());
  }
}
