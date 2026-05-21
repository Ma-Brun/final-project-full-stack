export interface FurnitureItem {
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

export type CreateFurnitureItem = Pick<
  FurnitureItem,
  'name' | 'room' | 'material' | 'price' | 'inStock'
>;

export type UpdateFurnitureItem = Partial<CreateFurnitureItem>;
