import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateLifestyleItem,
  LifestyleDocument,
  LifestyleItem,
  UpdateLifestyleItem,
} from './lifestyle.model';

@Injectable()
export class LifestyleService {
  // Connects this service to lifestyle data.
  constructor(
    @InjectModel(LifestyleItem.name)
    private readonly lifestyleModel: Model<LifestyleDocument>,
  ) {}

  // Finds all lifestyle items.
  findAllLifestyleItems(): Promise<LifestyleItem[]> {
    return this.lifestyleModel.find().exec();
  }

  // Creates one lifestyle item.
  async createLifestyleItem(item: CreateLifestyleItem): Promise<LifestyleItem> {
    return this.lifestyleModel.create({
      department: 'lifestyle',
      ...item,
    });
  }

  // Updates one lifestyle item by ID.
  async updateLifestyleItem(
    id: string,
    item: UpdateLifestyleItem,
  ): Promise<LifestyleItem> {
    const existingItem = await this.lifestyleModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();

    return this.requireLifestyleItem(existingItem, id);
  }

  // Updates lifestyle items by name.
  async updateLifestyleItemsByName(
    name: string,
    item: UpdateLifestyleItem,
  ): Promise<LifestyleItem[]> {
    const existingItems = await this.lifestyleModel.find({ name }).exec();

    if (existingItems.length === 0) {
      throw new NotFoundException(`No lifestyle items named ${name} were found`);
    }

    await this.lifestyleModel.updateMany({ name }, item, {
      runValidators: true,
    });

    return this.lifestyleModel.find({ name: item.name ?? name }).exec();
  }

  // Finds one lifestyle item by ID.
  async findLifestyleByID(id: string): Promise<LifestyleItem> {
    const item = await this.lifestyleModel.findById(id).exec();

    return this.requireLifestyleItem(item, id);
  }

  // Finds one random lifestyle item.
  async randomLifestyleItem(): Promise<LifestyleItem> {
    const items = await this.lifestyleModel.find().exec();

    if (items.length === 0) {
      throw new NotFoundException('No lifestyle items found');
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  // Finds lifestyle items by name.
  async findLifestyleByName(name: string): Promise<LifestyleItem[]> {
    const items = await this.lifestyleModel.find({ name }).exec();

    if (items.length === 0) {
      throw new NotFoundException(`No lifestyle items named ${name} were found`);
    }

    return items;
  }

  // Finds lifestyle items in stock.
  async findInStockLifestyleItems(): Promise<LifestyleItem[]> {
    const items = await this.lifestyleModel.find({ inStock: true }).exec();

    if (items.length === 0) {
      throw new NotFoundException('No in-stock lifestyle items found');
    }

    return items;
  }

  // Deletes one lifestyle item by ID.
  async removeLifestyleItem(id: string): Promise<LifestyleItem> {
    const removedItem = await this.lifestyleModel.findByIdAndDelete(id).exec();

    return this.requireLifestyleItem(removedItem, id);
  }

  // Deletes lifestyle items by name.
  async removeLifestyleItemsByName(name: string): Promise<LifestyleItem[]> {
    const removedItems = await this.lifestyleModel.find({ name }).exec();

    if (removedItems.length === 0) {
      throw new NotFoundException(`No lifestyle items named ${name} were found`);
    }

    await this.lifestyleModel.deleteMany({ name }).exec();

    return removedItems;
  }

  // Throws if a lifestyle item is missing.
  private requireLifestyleItem(
    item: LifestyleDocument | null,
    id: string,
  ): LifestyleItem {
    if (!item) {
      throw new NotFoundException(`Lifestyle item ${id} was not found`);
    }

    return item;
  }
}
