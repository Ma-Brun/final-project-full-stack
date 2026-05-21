import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProduceFoodItem,
  ProduceFoodItem,
  UpdateProduceFoodItem,
} from './produce-food.model';

@Injectable()
export class ProduceFoodService {
  private readonly items: ProduceFoodItem[] = [];
  private nextId = 1;

  findAllProduceFoodItems(): ProduceFoodItem[] {
    return this.items;
  }

  createProduceFoodItem(item: CreateProduceFoodItem): ProduceFoodItem {
    const now = new Date().toISOString();
    const newItem: ProduceFoodItem = {
      id: this.nextId,
      department: 'produce-food',
      name: item.name,
      price: item.price,
      inStock: item.inStock,
      isPerishable: item.isPerishable,
      createdAt: now,
      updatedAt: now,
    };

    this.nextId += 1;
    this.items.push(newItem);

    return newItem;
  }

  updateProduceFoodItem(
    id: number,
    item: UpdateProduceFoodItem,
  ): ProduceFoodItem {
    const existingItem = this.findProduceFoodItemById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.isPerishable = item.isPerishable ?? existingItem.isPerishable;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  removeProduceFoodItem(id: number): ProduceFoodItem {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Produce or food item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findProduceFoodItemById(id: number): ProduceFoodItem {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Produce or food item ${id} was not found`);
    }

    return item;
  }
}
