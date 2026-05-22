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

  async updateProduceFoodItemsByName(
    name: string,
    item: UpdateProduceFoodItem,
  ): Promise<ProduceFoodItem[]> {
    const existingItems = await this.produceFoodModel.find({ name }).exec();

    if (existingItems.length === 0) {
      throw new NotFoundException(
        `No produce or food items named ${name} were found`,
      );
    }

    await this.produceFoodModel.updateMany({ name }, item, {
      runValidators: true,
    });

    return this.produceFoodModel.find({ name: item.name ?? name }).exec();
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

  async findProduceFoodByName(name: string): Promise<ProduceFoodItem[]> {
    const items = await this.produceFoodModel.find({ name }).exec();

    if (items.length === 0) {
      throw new NotFoundException(
        `No produce or food items named ${name} were found`,
      );
    }

    return items;
  }

  async findInStockProduceFoodItems(): Promise<ProduceFoodItem[]> {
    const items = await this.produceFoodModel.find({ inStock: true }).exec();

    if (items.length === 0) {
      throw new NotFoundException('No in-stock produce or food items found');
    }

    return items;
  }

  async removeProduceFoodItem(id: string): Promise<ProduceFoodItem> {
    const removedItem = await this.produceFoodModel
      .findByIdAndDelete(id)
      .exec();

    return this.requireProduceFoodItem(removedItem, id);
  }

  async removeProduceFoodItemsByName(
    name: string,
  ): Promise<ProduceFoodItem[]> {
    const removedItems = await this.produceFoodModel.find({ name }).exec();

    if (removedItems.length === 0) {
      throw new NotFoundException(
        `No produce or food items named ${name} were found`,
      );
    }

    await this.produceFoodModel.deleteMany({ name }).exec();

    return removedItems;
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
