import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTechItem,
  TechItem,
  UpdateTechItem,
} from './tech.model';

@Injectable()
export class TechService {
  private readonly items: TechItem[] = [];
  private nextId = 1;

  findAllTechItems(): TechItem[] {
    return this.items;
  }

  createTechItem(item: CreateTechItem): TechItem {
    const now = new Date().toISOString();
    const newItem: TechItem = {
      id: this.nextId,
      department: 'tech',
      name: item.name,
      brand: item.brand,
      price: item.price,
      warrantyMonths: item.warrantyMonths,
      inStock: item.inStock,
      createdAt: now,
      updatedAt: now,
    };

    this.nextId += 1;
    this.items.push(newItem);

    return newItem;
  }

  updateTechItem(id: number, item: UpdateTechItem): TechItem {
    const existingItem = this.findTechItemById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.brand = item.brand ?? existingItem.brand;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.warrantyMonths =
      item.warrantyMonths ?? existingItem.warrantyMonths;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  removeTechItem(id: number): TechItem {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Tech item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findTechItemById(id: number): TechItem {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Tech item ${id} was not found`);
    }

    return item;
  }
}
