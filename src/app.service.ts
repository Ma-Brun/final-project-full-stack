import { Injectable } from '@nestjs/common';

export interface StoreOverview {
  storeName: string;
  message: string;
  departments: string[];
}

@Injectable()
export class AppService {
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
}
