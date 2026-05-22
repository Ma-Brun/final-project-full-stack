import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FurnitureDocument,
  CreateFurnitureItem,
  FurnitureItem,
  UpdateFurnitureItem,
} from './furniture.model';

@Injectable()
export class FurnitureService {
  constructor(
    @InjectModel(FurnitureItem.name)
    private readonly furnitureModel: Model<FurnitureDocument>,
  ) {}

  findAllFurnitureItems(): Promise<FurnitureItem[]> {
    return this.furnitureModel.find().exec();
  }

  async createFurnitureItem(item: CreateFurnitureItem): Promise<FurnitureItem> {
    return this.furnitureModel.create({
      department: 'furniture',
      ...item,
    });
  }

  async updateFurnitureItem(
    id: string,
    item: UpdateFurnitureItem,
  ): Promise<FurnitureItem> {
    const existingItem = await this.furnitureModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();

    return this.requireFurnitureItem(existingItem, id);
  }

  async updateFurnitureItemsByName(
    name: string,
    item: UpdateFurnitureItem,
  ): Promise<FurnitureItem[]> {
    const existingItems = await this.furnitureModel.find({ name }).exec();

    if (existingItems.length === 0) {
      throw new NotFoundException(`No furniture items named ${name} were found`);
    }

    await this.furnitureModel.updateMany({ name }, item, {
      runValidators: true,
    });

    return this.furnitureModel.find({ name: item.name ?? name }).exec();
  }

  async findFurnitureByID(id: string): Promise<FurnitureItem> {
    const item = await this.furnitureModel.findById(id).exec();

    return this.requireFurnitureItem(item, id);
  }

  async randomFurnitureItem(): Promise<FurnitureItem> {
    const items = await this.furnitureModel.find().exec();

    if (items.length === 0) {
      throw new NotFoundException('No furniture items found');
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  async findFurnitureByName(name: string): Promise<FurnitureItem[]> {
    const items = await this.furnitureModel.find({ name }).exec();

    if (items.length === 0) {
      throw new NotFoundException(`No furniture items named ${name} were found`);
    }

    return items;
  }

  async findInStockFurnitureItems(): Promise<FurnitureItem[]> {
    const items = await this.furnitureModel.find({ inStock: true }).exec();

    if (items.length === 0) {
      throw new NotFoundException('No in-stock furniture items found');
    }

    return items;
  }

  async removeFurnitureItem(id: string): Promise<FurnitureItem> {
    const removedItem = await this.furnitureModel.findByIdAndDelete(id).exec();

    return this.requireFurnitureItem(removedItem, id);
  }

  async removeFurnitureItemsByName(name: string): Promise<FurnitureItem[]> {
    const removedItems = await this.furnitureModel.find({ name }).exec();

    if (removedItems.length === 0) {
      throw new NotFoundException(`No furniture items named ${name} were found`);
    }

    await this.furnitureModel.deleteMany({ name }).exec();

    return removedItems;
  }

  private requireFurnitureItem(
    item: FurnitureDocument | null,
    id: string,
  ): FurnitureItem {
    if (!item) {
      throw new NotFoundException(`Furniture item ${id} was not found`);
    }

    return item;
  }
}
