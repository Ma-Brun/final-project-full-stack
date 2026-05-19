export interface Subset2Item {
  id: number;
  department: 'tech';
  name: string;
  brand: string;
  price: number;
  warrantyMonths: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateSubset2Item = Pick<
  Subset2Item,
  'name' | 'brand' | 'price' | 'warrantyMonths' | 'inStock'
>;

export type UpdateSubset2Item = Partial<CreateSubset2Item>;
