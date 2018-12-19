package ru.spbpu.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import ru.spbpu.entities.PcComponent;
import ru.spbpu.entities.PcItem;
import ru.spbpu.exceptions.BadRequestException;
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

  public List<PcComponent> getComponentsContaining(String nameDescrPart, int page) {
    return componentRepository.findAllByNameContainsOrDescriptionContainsOrderByName(
        nameDescrPart,
        nameDescrPart,
        new PageRequest(page, 10)
    ).getContent();
  }

  public int getComponentContainingPageNumber(String nameDescrPart, int page) {
    return componentRepository.findAllByNameContainsOrDescriptionContainsOrderByName(
        nameDescrPart,
        nameDescrPart,
        new PageRequest(page, 10)
    ).getTotalPages();
  }

  public PcComponent createComponent(String name, String description) {
    PcComponent component = new PcComponent(name, description);
    if (!componentRepository.findFirstByName(name).isPresent()
        && name.length() <= 100
        && description.length() <= 5000) {
      componentRepository.save(component);
      return component;
    } else {
      throw new BadRequestException("Component already exists");
    }
  }

  public PcComponent createComponent(String name) {
    return createComponent(name, "");
  }

  public PcItem createItem(PcComponent component, int amount, int price) {
    PcItem item = new PcItem(component, amount, price);
    itemRepository.save(item);
    return item;
  }

  public PcItem createItem(String name, int amount, int price) throws IllegalArgumentException {
    PcComponent component = componentRepository
        .findFirstByName(name)
        .orElseThrow(() -> new IllegalArgumentException("Component " + name + " does not exist"));
    return createItem(component, amount, price);
  }

  public PcItem createItem(PcComponent component, int amount) {
    return createItem(component, amount, 0);
  }

  public PcItem createItem(PcComponent component) {
    return createItem(component, 1, 0);
  }

  public PcItem createItem(String name, int amount) throws IllegalArgumentException {
    return createItem(name, amount, 0);
  }

  public PcItem createItem(String name) throws IllegalArgumentException {
    return createItem(name, 1, 0);
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
