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

  async removeLifestyleItem(id: string): Promise<LifestyleItem> {
    const removedItem = await this.lifestyleModel.findByIdAndDelete(id).exec();

    return this.requireLifestyleItem(removedItem, id);
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
