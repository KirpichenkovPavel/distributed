package ru.spbpu.entities;

import javax.persistence.*;

@Entity
@Table(name = "component")
public class PcComponent {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    private PcComponent() {}

    public PcComponent(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format("PC component %d %s %s", id, name, description);
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof PcComponent && ((PcComponent) o).getName().equals(name);
    }
}
