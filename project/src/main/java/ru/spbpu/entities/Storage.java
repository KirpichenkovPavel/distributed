package ru.spbpu.entities;

import javax.persistence.*;
import java.util.Map;

@Entity
@Table(name = "storage")
public class Storage {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;

  private String name;

  @OneToMany(mappedBy = "storage")
  @MapKeyJoinColumn(name = "component_id")
  private Map<PcComponent, PcItem> items;

  private Storage() {
  }

  public Storage(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }

  public Map<PcComponent, PcItem> getItems() {
    return items;
  }
}
