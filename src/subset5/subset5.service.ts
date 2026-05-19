import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSubset5Item,
  Subset5Item,
  UpdateSubset5Item,
} from './subset5.model';

@Injectable()
export class Subset5Service {
  private readonly items: Subset5Item[] = [];
  private nextId = 1;

  findAll(): Subset5Item[] {
    return this.items;
  }

  create(item: CreateSubset5Item): Subset5Item {
    const now = new Date().toISOString();
    const newItem: Subset5Item = {
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

  update(id: number, item: UpdateSubset5Item): Subset5Item {
    const existingItem = this.findById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.room = item.room ?? existingItem.room;
    existingItem.material = item.material ?? existingItem.material;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  remove(id: number): Subset5Item {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Furniture item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findById(id: number): Subset5Item {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Furniture item ${id} was not found`);
    }

    return item;
  }
}
