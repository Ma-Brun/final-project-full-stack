import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSubset2Item,
  Subset2Item,
  UpdateSubset2Item,
} from './subset2.model';

@Injectable()
export class Subset2Service {
  private readonly items: Subset2Item[] = [];
  private nextId = 1;

  findAll(): Subset2Item[] {
    return this.items;
  }

  create(item: CreateSubset2Item): Subset2Item {
    const now = new Date().toISOString();
    const newItem: Subset2Item = {
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

  update(id: number, item: UpdateSubset2Item): Subset2Item {
    const existingItem = this.findById(id);

    existingItem.name = item.name ?? existingItem.name;
    existingItem.brand = item.brand ?? existingItem.brand;
    existingItem.price = item.price ?? existingItem.price;
    existingItem.warrantyMonths =
      item.warrantyMonths ?? existingItem.warrantyMonths;
    existingItem.inStock = item.inStock ?? existingItem.inStock;
    existingItem.updatedAt = new Date().toISOString();

    return existingItem;
  }

  remove(id: number): Subset2Item {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Tech item ${id} was not found`);
    }

    const [removedItem] = this.items.splice(index, 1);

    return removedItem;
  }

  private findById(id: number): Subset2Item {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(`Tech item ${id} was not found`);
    }

    return item;
  }
}
