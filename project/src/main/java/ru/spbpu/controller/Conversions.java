package ru.spbpu.controller;

import org.springframework.stereotype.Component;
import ru.spbpu.dto.ItemDto;
import ru.spbpu.entity.PcComponent;
import ru.spbpu.entity.PcItem;
import ru.spbpu.repository.PcComponentRepository;
import ru.spbpu.repository.PcItemRepository;

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
