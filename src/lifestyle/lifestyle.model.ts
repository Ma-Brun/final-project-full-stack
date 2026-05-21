export interface LifestyleItem {
  id: number;
  department: 'lifestyle';
  name: string;
  useCase: string;
  price: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateLifestyleItem = Pick<
  LifestyleItem,
  'name' | 'useCase' | 'price' | 'inStock'
>;

export type UpdateLifestyleItem = Partial<CreateLifestyleItem>;
