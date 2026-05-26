import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'lifestyle', timestamps: true, versionKey: false })
export class LifestyleItem {
  id: string;

  @Prop({ default: 'lifestyle', immutable: true })
  department: 'lifestyle';

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  useCase: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  inStock: boolean;

  createdAt: string;
  updatedAt: string;
}

export type LifestyleDocument = HydratedDocument<LifestyleItem>;
export const LifestyleSchema = SchemaFactory.createForClass(LifestyleItem);

LifestyleSchema.set('toJSON', {
  virtuals: true,
  // Formats lifestyle documents for JSON.
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as { _id?: unknown })._id;
    return returnedObject;
  },
});

export type CreateLifestyleItem = Pick<
  LifestyleItem,
  'name' | 'useCase' | 'price' | 'inStock'
>;

export type UpdateLifestyleItem = Partial<CreateLifestyleItem>;
