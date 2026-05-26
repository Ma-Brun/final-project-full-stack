import { Injectable, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClothingDocument, ClothingItem } from './clothing/clothing.model';
import { FurnitureDocument, FurnitureItem } from './furniture/furniture.model';
import {
  ProduceFoodDocument,
  ProduceFoodItem,
} from './produce-food/produce-food.model';
import { LifestyleDocument, LifestyleItem } from './lifestyle/lifestyle.model';
import { TechDocument, TechItem } from './tech/tech.model';

export interface StoreOverview {
  storeName: string;
  message: string;
  departments: string[];
}

export type StoreItem =
  | ClothingItem
  | FurnitureItem
  | ProduceFoodItem
  | LifestyleItem
  | TechItem;

export type PriceSortOrder = 'asc' | 'desc';

@Injectable()
export class AppService {
  // Connects this service to every item collection.
  constructor(
    @Optional()
    @InjectModel(ClothingItem.name)
    private readonly clothingModel?: Model<ClothingDocument>,
    @Optional()
    @InjectModel(FurnitureItem.name)
    private readonly furnitureModel?: Model<FurnitureDocument>,
    @Optional()
    @InjectModel(ProduceFoodItem.name)
    private readonly produceFoodModel?: Model<ProduceFoodDocument>,
    @Optional()
    @InjectModel(LifestyleItem.name)
    private readonly lifestyleModel?: Model<LifestyleDocument>,
    @Optional()
    @InjectModel(TechItem.name)
    private readonly techModel?: Model<TechDocument>,
  ) {}

  // Builds the store overview response.
  getStoreOverview(): StoreOverview {
    return {
      storeName: 'Muncher store',
      message: 'Welcome to the main store handler.',
      departments: [
        'produce-food',
        'tech',
        'clothing',
        'lifestyle',
        'furniture',
      ],
    };
  }

  // Finds every item across all collections.
  async findAllStoreItems(): Promise<StoreItem[]> {
    const itemGroups = await Promise.all(
      this.storeModels().map((model) => model.find().exec()),
    );

    return itemGroups.flat();
  }

  // Finds every in-stock item across collections.
  async findAllInStockStoreItems(): Promise<StoreItem[]> {
    const itemGroups = await Promise.all(
      this.storeModels().map((model) => model.find({ inStock: true }).exec()),
    );

    return itemGroups.flat();
  }

  // Sorts every store item by price.
  async findAllStoreItemsSortedByPrice(
    order: PriceSortOrder = 'asc',
  ): Promise<StoreItem[]> {
    const items = await this.findAllStoreItems();
    const direction = order === 'desc' ? -1 : 1;

    return items.sort((firstItem, secondItem) => {
      return (firstItem.price - secondItem.price) * direction;
    });
  }

  // Lists all available item models.
  private storeModels() {
    return [
      this.clothingModel,
      this.furnitureModel,
      this.produceFoodModel,
      this.lifestyleModel,
      this.techModel,
    ].filter((model): model is Model<any> => Boolean(model));
  }
}
