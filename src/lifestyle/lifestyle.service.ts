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
  constructor(
    @InjectModel(LifestyleItem.name)
    private readonly lifestyleModel: Model<LifestyleDocument>,
  ) {}

  findAllLifestyleItems(): Promise<LifestyleItem[]> {
    return this.lifestyleModel.find().exec();
  }

  async createLifestyleItem(item: CreateLifestyleItem): Promise<LifestyleItem> {
    return this.lifestyleModel.create({
      department: 'lifestyle',
      ...item,
    });
  }

  async updateLifestyleItem(
    id: string,
    item: UpdateLifestyleItem,
  ): Promise<LifestyleItem> {
    const existingItem = await this.lifestyleModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();

    return this.requireLifestyleItem(existingItem, id);
  }

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

  async findLifestyleByID(id: string): Promise<LifestyleItem> {
    const item = await this.lifestyleModel.findById(id).exec();

    return this.requireLifestyleItem(item, id);
  }

  async randomLifestyleItem(): Promise<LifestyleItem> {
    const items = await this.lifestyleModel.find().exec();

    if (items.length === 0) {
      throw new NotFoundException('No lifestyle items found');
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  async findLifestyleByName(name: string): Promise<LifestyleItem[]> {
    const items = await this.lifestyleModel.find({ name }).exec();

    if (items.length === 0) {
      throw new NotFoundException(`No lifestyle items named ${name} were found`);
    }

    return items;
  }

  async findInStockLifestyleItems(): Promise<LifestyleItem[]> {
    const items = await this.lifestyleModel.find({ inStock: true }).exec();

    if (items.length === 0) {
      throw new NotFoundException('No in-stock lifestyle items found');
    }

    return items;
  }

  async removeLifestyleItem(id: string): Promise<LifestyleItem> {
    const removedItem = await this.lifestyleModel.findByIdAndDelete(id).exec();

    return this.requireLifestyleItem(removedItem, id);
  }

  async removeLifestyleItemsByName(name: string): Promise<LifestyleItem[]> {
    const removedItems = await this.lifestyleModel.find({ name }).exec();

    if (removedItems.length === 0) {
      throw new NotFoundException(`No lifestyle items named ${name} were found`);
    }

    await this.lifestyleModel.deleteMany({ name }).exec();

    return removedItems;
  }

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
