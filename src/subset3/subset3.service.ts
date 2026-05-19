import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSubset3Item,
  Subset3Item,
  UpdateSubset3Item,
} from './subset3.model';

@Injectable()
export class Subset3Service {
  private readonly items: Subset3Item[] = [];
  private nextId = 1;

  findAll(): Subset3Item[] {
    return this.items;
  }

  create(item: CreateSubset3Item): Subset3Item {
    const now = new Date().toISOString();
    const newItem: Subset3Item = {
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

  update(id: number, item: UpdateSubset3Item): Subset3Item {
    const existingItem = this.findById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.size = item.size ?? existingItem.size;
    existingItem.color = item.color ?? existingItem.color;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  remove(id: number): Subset3Item {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Clothing item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findById(id: number): Subset3Item {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Clothing item ${id} was not found`);
    }

    return item;
  }
}
