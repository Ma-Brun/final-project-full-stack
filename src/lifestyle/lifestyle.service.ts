import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateLifestyleItem,
  LifestyleItem,
  UpdateLifestyleItem,
} from './lifestyle.model';

@Injectable()
export class LifestyleService {
  private readonly items: LifestyleItem[] = [];
  private nextId = 1;

  findAllLifestyleItems(): LifestyleItem[] {
    return this.items;
  }

  createLifestyleItem(item: CreateLifestyleItem): LifestyleItem {
    const now = new Date().toISOString();
    const newItem: LifestyleItem = {
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

  updateLifestyleItem(id: number, item: UpdateLifestyleItem): LifestyleItem {
    const existingItem = this.findLifestyleItemById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.useCase = item.useCase ?? existingItem.useCase;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  removeLifestyleItem(id: number): LifestyleItem {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Lifestyle item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findLifestyleItemById(id: number): LifestyleItem {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Lifestyle item ${id} was not found`);
    }

    return item;
  }
}
