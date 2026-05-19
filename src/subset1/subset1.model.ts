export interface Subset1Item {
  id: number;
  department: 'produce-food';
  name: string;
  price: number;
  inStock: boolean;
  isPerishable: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateSubset1Item = Pick<
  Subset1Item,
  'name' | 'price' | 'inStock' | 'isPerishable'
>;

export type UpdateSubset1Item = Partial<CreateSubset1Item>;
