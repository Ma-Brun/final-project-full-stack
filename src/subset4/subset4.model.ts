export interface Subset4Item {
  id: number;
  department: 'lifestyle';
  name: string;
  useCase: string;
  price: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateSubset4Item = Pick<
  Subset4Item,
  'name' | 'useCase' | 'price' | 'inStock'
>;

export type UpdateSubset4Item = Partial<CreateSubset4Item>;
