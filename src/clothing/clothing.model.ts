import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'clothing', timestamps: true, versionKey: false })
export class ClothingItem {
  id: string;

  @Prop({ default: 'clothing', immutable: true })
  department: 'clothing';

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  inStock: boolean;

  createdAt: string;
  updatedAt: string;
}

export type ClothingDocument = HydratedDocument<ClothingItem>;
export const ClothingSchema = SchemaFactory.createForClass(ClothingItem);

ClothingSchema.set('toJSON', {
  virtuals: true,
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as { _id?: unknown })._id;
    return returnedObject;
  },
});

export type CreateClothingItem = Pick<
  ClothingItem,
  'name' | 'size' | 'color' | 'price' | 'inStock'
>;

export type UpdateClothingItem = Partial<CreateClothingItem>;
