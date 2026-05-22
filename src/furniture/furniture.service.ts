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

  async removeFurnitureItem(id: string): Promise<FurnitureItem> {
    const removedItem = await this.furnitureModel.findByIdAndDelete(id).exec();

    return this.requireFurnitureItem(removedItem, id);
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
