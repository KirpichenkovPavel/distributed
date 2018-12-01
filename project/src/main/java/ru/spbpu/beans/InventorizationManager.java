package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.spbpu.entities.PcComponent;
import ru.spbpu.entities.PcItem;
import ru.spbpu.repositories.PcComponentRepository;
import ru.spbpu.repositories.PcItemRepository;

import java.util.List;
import java.util.Optional;

@Component
public class InventorizationManager {

  private final
  PcComponentRepository componentRepository;

  private final
  PcItemRepository itemRepository;

  @Autowired
  public InventorizationManager(
      PcComponentRepository componentRepository,
      PcItemRepository itemRepository
  ) {
    this.componentRepository = componentRepository;
    this.itemRepository = itemRepository;
  }

  public Optional<PcComponent> getComponentWithName(String name) {
    return componentRepository.findFirstByName(name);
  }

  public List<PcComponent> getComponentsContaining(String nameDescrPart) {
    return componentRepository
        .findAllByNameContainsOrDescriptionContains(nameDescrPart, nameDescrPart);
  }

  public void createComponent(String name, String description) {
    PcComponent component = new PcComponent(name, description);
    componentRepository.save(component);
  }

  public void createComponent(String name) {
    createComponent(name, "");
  }

  public void createItem(PcComponent component, int amount, int price) {
    PcItem item = new PcItem(component, amount, price);
    itemRepository.save(item);
  }

  public void createItem(String name, int amount, int price) throws IllegalArgumentException {
    PcComponent component = componentRepository
        .findFirstByName(name)
        .orElseThrow(() -> new IllegalArgumentException("Component " + name + " does not exist"));
    createItem(component, amount, price);
  }

  public void createItem(PcComponent component, int amount) {
    createItem(component, amount, 0);
  }

  public void createItem(PcComponent component) {
    createItem(component, 1, 0);
  }

  public void createItem(String name, int amount) throws IllegalArgumentException {
    createItem(name, amount, 0);
  }

  public void createItem(String name) throws IllegalArgumentException {
    createItem(name, 1, 0);
  }

  public void setAmount(PcItem item, int amount) {
    item.setAmount(amount);
    itemRepository.save(item);
  }

  public void setPrice(PcItem item, int price) {
    item.setPrice(price);
    itemRepository.save(item);
  }

  public void setAmountAndPrice(PcItem item, int amount, int price) {
    item.setAmount(amount);
    item.setPrice(price);
    itemRepository.save(item);
  }


}
