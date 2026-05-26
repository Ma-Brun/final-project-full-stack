import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'tech', timestamps: true, versionKey: false })
export class TechItem {
  id: string;

  @Prop({ default: 'tech', immutable: true })
  department: 'tech';

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  warrantyMonths: number;

  @Prop({ required: true })
  inStock: boolean;

  createdAt: string;
  updatedAt: string;
}

export type TechDocument = HydratedDocument<TechItem>;
export const TechSchema = SchemaFactory.createForClass(TechItem);

TechSchema.set('toJSON', {
  virtuals: true,
  // Formats tech documents for JSON.
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as { _id?: unknown })._id;
    return returnedObject;
  },
});

export type CreateTechItem = Pick<
  TechItem,
  'name' | 'brand' | 'price' | 'warrantyMonths' | 'inStock'
>;

export type UpdateTechItem = Partial<CreateTechItem>;
