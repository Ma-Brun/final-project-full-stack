import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'furniture', timestamps: true, versionKey: false })
export class FurnitureItem {
  id: string;

  @Prop({ default: 'furniture', immutable: true })
  department: 'furniture';

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  room: string;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  inStock: boolean;

  createdAt: string;
  updatedAt: string;
}

export type FurnitureDocument = HydratedDocument<FurnitureItem>;
export const FurnitureSchema = SchemaFactory.createForClass(FurnitureItem);

FurnitureSchema.set('toJSON', {
  virtuals: true,
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as { _id?: unknown })._id;
    return returnedObject;
  },
});

export type CreateFurnitureItem = Pick<
  FurnitureItem,
  'name' | 'room' | 'material' | 'price' | 'inStock'
>;

export type UpdateFurnitureItem = Partial<CreateFurnitureItem>;
