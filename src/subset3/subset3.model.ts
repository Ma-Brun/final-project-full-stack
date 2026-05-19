export interface Subset3Item {
  id: number;
  department: 'clothing';
  name: string;
  size: string;
  color: string;
  price: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateSubset3Item = Pick<
  Subset3Item,
  'name' | 'size' | 'color' | 'price' | 'inStock'
>;

export type UpdateSubset3Item = Partial<CreateSubset3Item>;
