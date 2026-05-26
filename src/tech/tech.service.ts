import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateTechItem,
  TechDocument,
  TechItem,
  UpdateTechItem,
} from './tech.model';

@Injectable()
export class TechService {
  // Connects this service to tech data.
  constructor(
    @InjectModel(TechItem.name)
    private readonly techModel: Model<TechDocument>,
  ) {}

  // Finds all tech items.
  findAllTechItems(): Promise<TechItem[]> {
    return this.techModel.find().exec();
  }

  // Creates one tech item.
  async createTechItem(item: CreateTechItem): Promise<TechItem> {
    return this.techModel.create({
      department: 'tech',
      ...item,
    });
  }

  // Updates one tech item by ID.
  async updateTechItem(id: string, item: UpdateTechItem): Promise<TechItem> {
    const existingItem = await this.techModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();

    return this.requireTechItem(existingItem, id);
  }

  // Updates tech items by name.
  async updateTechItemsByName(
    name: string,
    item: UpdateTechItem,
  ): Promise<TechItem[]> {
    const existingItems = await this.techModel.find({ name }).exec();

    if (existingItems.length === 0) {
      throw new NotFoundException(`No tech items named ${name} were found`);
    }

    await this.techModel.updateMany({ name }, item, {
      runValidators: true,
    });

    return this.techModel.find({ name: item.name ?? name }).exec();
  }

  // Finds one tech item by ID.
  async findTechByID(id: string): Promise<TechItem> {
    const item = await this.techModel.findById(id).exec();

    return this.requireTechItem(item, id);
  }

  // Finds one random tech item.
  async randomTechItem(): Promise<TechItem> {
    const items = await this.techModel.find().exec();

    if (items.length === 0) {
      throw new NotFoundException('No tech items found');
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  // Finds tech items by name.
  async findTechByName(name: string): Promise<TechItem[]> {
    const items = await this.techModel.find({ name }).exec();

    if (items.length === 0) {
      throw new NotFoundException(`No tech items named ${name} were found`);
    }

    return items;
  }

  // Finds tech items in stock.
  async findInStockTechItems(): Promise<TechItem[]> {
    const items = await this.techModel.find({ inStock: true }).exec();

    if (items.length === 0) {
      throw new NotFoundException('No in-stock tech items found');
    }

    return items;
  }

  // Deletes one tech item by ID.
  async removeTechItem(id: string): Promise<TechItem> {
    const removedItem = await this.techModel.findByIdAndDelete(id).exec();

    return this.requireTechItem(removedItem, id);
  }

  // Deletes tech items by name.
  async removeTechItemsByName(name: string): Promise<TechItem[]> {
    const removedItems = await this.techModel.find({ name }).exec();

    if (removedItems.length === 0) {
      throw new NotFoundException(`No tech items named ${name} were found`);
    }

    await this.techModel.deleteMany({ name }).exec();

    return removedItems;
  }

  // Throws if a tech item is missing.
  private requireTechItem(item: TechDocument | null, id: string): TechItem {
    if (!item) {
      throw new NotFoundException(`Tech item ${id} was not found`);
    }

    return item;
  }
}
