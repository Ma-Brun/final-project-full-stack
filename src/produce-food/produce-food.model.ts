export interface ProduceFoodItem {
  id: number;
  department: 'produce-food';
  name: string;
  price: number;
  inStock: boolean;
  isPerishable: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateProduceFoodItem = Pick<
  ProduceFoodItem,
  'name' | 'price' | 'inStock' | 'isPerishable'
>;

export type UpdateProduceFoodItem = Partial<CreateProduceFoodItem>;
