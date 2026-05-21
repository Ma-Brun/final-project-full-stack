export interface ClothingItem {
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

export type CreateClothingItem = Pick<
  ClothingItem,
  'name' | 'size' | 'color' | 'price' | 'inStock'
>;

export type UpdateClothingItem = Partial<CreateClothingItem>;
