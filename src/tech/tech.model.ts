export interface TechItem {
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

export type CreateTechItem = Pick<
  TechItem,
  'name' | 'brand' | 'price' | 'warrantyMonths' | 'inStock'
>;

export type UpdateTechItem = Partial<CreateTechItem>;
