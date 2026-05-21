import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateFurnitureItem,
  FurnitureItem,
  UpdateFurnitureItem,
} from './furniture.model';

@Injectable()
export class FurnitureService {
  private readonly items: FurnitureItem[] = [];
  private nextId = 1;

  findAllFurnitureItems(): FurnitureItem[] {
    return this.items;
  }

  createFurnitureItem(item: CreateFurnitureItem): FurnitureItem {
    const now = new Date().toISOString();
    const newItem: FurnitureItem = {
      id: this.nextId,
      department: 'furniture',
      name: item.name,
      room: item.room,
      material: item.material,
      price: item.price,
      inStock: item.inStock,
      createdAt: now,
      updatedAt: now,
    };

    this.nextId += 1;
    this.items.push(newItem);

    return newItem;
  }

  updateFurnitureItem(id: number, item: UpdateFurnitureItem): FurnitureItem {
    const existingItem = this.findFurnitureItemById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.room = item.room ?? existingItem.room;
    existingItem.material = item.material ?? existingItem.material;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  removeFurnitureItem(id: number): FurnitureItem {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Furniture item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findFurnitureItemById(id: number): FurnitureItem {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Furniture item ${id} was not found`);
    }

    return item;
  }
}
