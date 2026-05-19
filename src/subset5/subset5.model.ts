export interface Subset5Item {
  id: number;
  department: 'furniture';
  name: string;
  room: string;
  material: string;
  price: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateSubset5Item = Pick<
  Subset5Item,
  'name' | 'room' | 'material' | 'price' | 'inStock'
>;

export type UpdateSubset5Item = Partial<CreateSubset5Item>;
