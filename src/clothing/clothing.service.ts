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
  constructor(
    @InjectModel(ClothingItem.name)
    private readonly clothingModel: Model<ClothingDocument>,
  ) {}

  findAllClothingItems(): Promise<ClothingItem[]> {
    return this.clothingModel.find().exec();
  }

  async createClothingItem(item: CreateClothingItem): Promise<ClothingItem> {
    return this.clothingModel.create({
      department: 'clothing',
      ...item,
    });
  }

  async updateClothingItem(
    id: string,
    item: UpdateClothingItem,
  ): Promise<ClothingItem> {
    const existingItem = await this.clothingModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();

    return this.requireClothingItem(existingItem, id);
  }

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

  async findClothingByID(id: string): Promise<ClothingItem> {
    const item = await this.clothingModel.findById(id).exec();

    return this.requireClothingItem(item, id);
  }

  async RandomClothingItem(): Promise<ClothingItem> {
    const items = await this.clothingModel.find().exec();

    if (items.length === 0) {
      throw new NotFoundException('No clothing items found');
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  async findClothingByName(name: string): Promise<ClothingItem[]> {
    const items = await this.clothingModel.find({ name }).exec();

    if (items.length === 0) {
      throw new NotFoundException(`No clothing items named ${name} were found`);
    }

    return items;
  }

  async findInStockClothingItems(): Promise<ClothingItem[]> {
    const items = await this.clothingModel.find({ inStock: true }).exec();

    if (items.length === 0) {
      throw new NotFoundException('No in-stock clothing items found');
    }

    return items;
  }

  async removeClothingItem(id: string): Promise<ClothingItem> {
    const removedItem = await this.clothingModel.findByIdAndDelete(id).exec();

    return this.requireClothingItem(removedItem, id);
  }

  async removeClothingItemsByName(name: string): Promise<ClothingItem[]> {
    const removedItems = await this.clothingModel.find({ name }).exec();

    if (removedItems.length === 0) {
      throw new NotFoundException(`No clothing items named ${name} were found`);
    }

    await this.clothingModel.deleteMany({ name }).exec();

    return removedItems;
  }

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
