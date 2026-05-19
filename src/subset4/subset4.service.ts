import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSubset4Item,
  Subset4Item,
  UpdateSubset4Item,
} from './subset4.model';

@Injectable()
export class Subset4Service {
  private readonly items: Subset4Item[] = [];
  private nextId = 1;

  findAll(): Subset4Item[] {
    return this.items;
  }

  create(item: CreateSubset4Item): Subset4Item {
    const now = new Date().toISOString();
    const newItem: Subset4Item = {
      id: this.nextId,
      department: 'lifestyle',
      name: item.name,
      useCase: item.useCase,
      price: item.price,
      inStock: item.inStock,
      createdAt: now,
      updatedAt: now,
    };

    this.nextId += 1;
    this.items.push(newItem);

    return newItem;
  }

  update(id: number, item: UpdateSubset4Item): Subset4Item {
    const existingItem = this.findById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.useCase = item.useCase ?? existingItem.useCase;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  remove(id: number): Subset4Item {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Lifestyle item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findById(id: number): Subset4Item {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Lifestyle item ${id} was not found`);
    }

    return item;
  }
}
