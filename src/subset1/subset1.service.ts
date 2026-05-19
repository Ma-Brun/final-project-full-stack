import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSubset1Item,
  Subset1Item,
  UpdateSubset1Item,
} from './subset1.model';

@Injectable()
export class Subset1Service {
  private readonly items: Subset1Item[] = [];
  private nextId = 1;

  findAll(): Subset1Item[] {
    return this.items;
  }

  create(item: CreateSubset1Item): Subset1Item {
    const now = new Date().toISOString();
    const newItem: Subset1Item = {
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

  update(id: number, item: UpdateSubset1Item): Subset1Item {
    const existingItem = this.findById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.isPerishable = item.isPerishable ?? existingItem.isPerishable;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  remove(id: number): Subset1Item {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Produce or food item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findById(id: number): Subset1Item {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Produce or food item ${id} was not found`);
    }

    return item;
  }
}
