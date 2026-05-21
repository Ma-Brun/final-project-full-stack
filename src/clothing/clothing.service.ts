import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateClothingItem,
  ClothingItem,
  UpdateClothingItem,
} from './clothing.model';

@Injectable()
export class ClothingService {
  private readonly items: ClothingItem[] = [];
  private nextId = 1;

  findAllClothingItems(): ClothingItem[] {
    return this.items;
  }

  createClothingItem(item: CreateClothingItem): ClothingItem {
    const now = new Date().toISOString();
    const newItem: ClothingItem = {
      id: this.nextId,
      department: 'clothing',
      name: item.name,
      size: item.size,
      color: item.color,
      price: item.price,
      inStock: item.inStock,
      createdAt: now,
      updatedAt: now,
    };

    this.nextId += 1;
    this.items.push(newItem);

    return newItem;
  }

  updateClothingItem(id: number, item: UpdateClothingItem): ClothingItem {
    const existingItem = this.findClothingItemById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.size = item.size ?? existingItem.size;
    existingItem.color = item.color ?? existingItem.color;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  removeClothingItem(id: number): ClothingItem {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Clothing item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findClothingItemById(id: number): ClothingItem {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Clothing item ${id} was not found`);
    }

    return item;
  }
}
