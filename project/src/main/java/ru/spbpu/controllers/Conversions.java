package ru.spbpu.controllers;

import org.springframework.stereotype.Component;
import ru.spbpu.dtos.ItemDto;
import ru.spbpu.entities.PcComponent;
import ru.spbpu.entities.PcItem;
import ru.spbpu.repositories.PcComponentRepository;
import ru.spbpu.repositories.PcItemRepository;

import java.util.Optional;

@Component
public class Conversions {

  private PcItemRepository itemRepository;
  private PcComponentRepository componentRepository;

  public Conversions(
      PcItemRepository itemRepository,
      PcComponentRepository componentRepository
  ) {
    this.itemRepository = itemRepository;
    this.componentRepository = componentRepository;
  }

  public Optional<PcItem> toEntity(ItemDto itemDto) {
    Optional<PcComponent> component = componentRepository.findFirstByName(
        itemDto.getName());
    return component.map(pcComponent ->
        new PcItem(
            pcComponent,
            itemDto.getAmount(),
            itemDto.getPrice())
    );
  }
}
