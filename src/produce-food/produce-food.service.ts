import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateProduceFoodItem,
  ProduceFoodDocument,
  ProduceFoodItem,
  UpdateProduceFoodItem,
} from './produce-food.model';

@Injectable()
export class ProduceFoodService {
  constructor(
    @InjectModel(ProduceFoodItem.name)
    private readonly produceFoodModel: Model<ProduceFoodDocument>,
  ) {}

  findAllProduceFoodItems(): Promise<ProduceFoodItem[]> {
    return this.produceFoodModel.find().exec();
  }

  async createProduceFoodItem(
    item: CreateProduceFoodItem,
  ): Promise<ProduceFoodItem> {
    return this.produceFoodModel.create({
      department: 'produce-food',
      ...item,
    });
  }

  async updateProduceFoodItem(
    id: string,
    item: UpdateProduceFoodItem,
  ): Promise<ProduceFoodItem> {
    const existingItem = await this.produceFoodModel
      .findByIdAndUpdate(id, item, { new: true, runValidators: true })
      .exec();

    return this.requireProduceFoodItem(existingItem, id);
  }

  async findProduceFoodByID(id: string): Promise<ProduceFoodItem> {
    const item = await this.produceFoodModel.findById(id).exec();

    return this.requireProduceFoodItem(item, id);
  }

  async randomProduceFoodItem(): Promise<ProduceFoodItem> {
    const items = await this.produceFoodModel.find().exec();

    if (items.length === 0) {
      throw new NotFoundException('No produce or food items found');
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  async removeProduceFoodItem(id: string): Promise<ProduceFoodItem> {
    const removedItem = await this.produceFoodModel
      .findByIdAndDelete(id)
      .exec();

    return this.requireProduceFoodItem(removedItem, id);
  }

  private requireProduceFoodItem(
    item: ProduceFoodDocument | null,
    id: string,
  ): ProduceFoodItem {
    if (!item) {
      throw new NotFoundException(`Produce or food item ${id} was not found`);
    }

    return item;
  }
}
