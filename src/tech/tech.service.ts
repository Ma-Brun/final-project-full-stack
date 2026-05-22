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
  constructor(
    @InjectModel(TechItem.name)
    private readonly techModel: Model<TechDocument>,
  ) {}

  findAllTechItems(): Promise<TechItem[]> {
    return this.techModel.find().exec();
  }

  async createTechItem(item: CreateTechItem): Promise<TechItem> {
    return this.techModel.create({
      department: 'tech',
      ...item,
    });
  }

  async updateTechItem(id: string, item: UpdateTechItem): Promise<TechItem> {
    const existingItem = await this.techModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();

    return this.requireTechItem(existingItem, id);
  }

  async findTechByID(id: string): Promise<TechItem> {
    const item = await this.techModel.findById(id).exec();

    return this.requireTechItem(item, id);
  }

  async randomTechItem(): Promise<TechItem> {
    const items = await this.techModel.find().exec();

    if (items.length === 0) {
      throw new NotFoundException('No tech items found');
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  async removeTechItem(id: string): Promise<TechItem> {
    const removedItem = await this.techModel.findByIdAndDelete(id).exec();

    return this.requireTechItem(removedItem, id);
  }

  private requireTechItem(item: TechDocument | null, id: string): TechItem {
    if (!item) {
      throw new NotFoundException(`Tech item ${id} was not found`);
    }

    return item;
  }
}
