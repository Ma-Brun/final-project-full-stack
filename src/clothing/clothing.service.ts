import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateClothingItem,
  ClothingDocument,
  ClothingItem,
  UpdateClothingItem,
} from './clothing.model';

@Injectable()
export class ClothingService {
  // Connects this service to clothing data.
  constructor(
    @InjectModel(ClothingItem.name)
    private readonly clothingModel: Model<ClothingDocument>,
  ) {}

  // Finds all clothing items.
  findAllClothingItems(): Promise<ClothingItem[]> {
    return this.clothingModel.find().exec();
  }

  // Creates one clothing item.
  async createClothingItem(item: CreateClothingItem): Promise<ClothingItem> {
    return this.clothingModel.create({
      department: 'clothing',
      ...item,
    });
  }

  // Updates one clothing item by ID.
  async updateClothingItem(
    id: string,
    item: UpdateClothingItem,
  ): Promise<ClothingItem> {
    const existingItem = await this.clothingModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();

    return this.requireClothingItem(existingItem, id);
  }

  // Updates clothing items by name.
  async updateClothingItemsByName(
    name: string,
    item: UpdateClothingItem,
  ): Promise<ClothingItem[]> {
    const existingItems = await this.clothingModel.find({ name }).exec();

    if (existingItems.length === 0) {
      throw new NotFoundException(`No clothing items named ${name} were found`);
    }

    await this.clothingModel.updateMany({ name }, item, {
      runValidators: true,
    });

    return this.clothingModel.find({ name: item.name ?? name }).exec();
  }

  // Finds one clothing item by ID.
  async findClothingByID(id: string): Promise<ClothingItem> {
    const item = await this.clothingModel.findById(id).exec();

    return this.requireClothingItem(item, id);
  }

  // Finds one random clothing item.
  async RandomClothingItem(): Promise<ClothingItem> {
    const items = await this.clothingModel.find().exec();

    if (items.length === 0) {
      throw new NotFoundException('No clothing items found');
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  // Finds clothing items by name.
  async findClothingByName(name: string): Promise<ClothingItem[]> {
    const items = await this.clothingModel.find({ name }).exec();

    if (items.length === 0) {
      throw new NotFoundException(`No clothing items named ${name} were found`);
    }

    return items;
  }

  // Finds clothing items in stock.
  async findInStockClothingItems(): Promise<ClothingItem[]> {
    const items = await this.clothingModel.find({ inStock: true }).exec();

    if (items.length === 0) {
      throw new NotFoundException('No in-stock clothing items found');
    }

    return items;
  }

  // Deletes one clothing item by ID.
  async removeClothingItem(id: string): Promise<ClothingItem> {
    const removedItem = await this.clothingModel.findByIdAndDelete(id).exec();

    return this.requireClothingItem(removedItem, id);
  }

  // Deletes clothing items by name.
  async removeClothingItemsByName(name: string): Promise<ClothingItem[]> {
    const removedItems = await this.clothingModel.find({ name }).exec();

    if (removedItems.length === 0) {
      throw new NotFoundException(`No clothing items named ${name} were found`);
    }

    await this.clothingModel.deleteMany({ name }).exec();

    return removedItems;
  }

  // Throws if a clothing item is missing.
  private requireClothingItem(
    item: ClothingDocument | null,
    id: string,
  ): ClothingItem {
    if (!item) {
      throw new NotFoundException(`Clothing item ${id} was not found`);
    }

    return item;
  }
}
