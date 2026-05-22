import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'produce-food', timestamps: true, versionKey: false })
export class ProduceFoodItem {
  id: string;

  @Prop({ default: 'produce-food', immutable: true })
  department: 'produce-food';

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  inStock: boolean;

  @Prop({ required: true })
  isPerishable: boolean;

  createdAt: string;
  updatedAt: string;
}

export type ProduceFoodDocument = HydratedDocument<ProduceFoodItem>;
export const ProduceFoodSchema = SchemaFactory.createForClass(ProduceFoodItem);

ProduceFoodSchema.set('toJSON', {
  virtuals: true,
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete (returnedObject as { _id?: unknown })._id;
    return returnedObject;
  },
});

export type CreateProduceFoodItem = Pick<
  ProduceFoodItem,
  'name' | 'price' | 'inStock' | 'isPerishable'
>;

export type UpdateProduceFoodItem = Partial<CreateProduceFoodItem>;
