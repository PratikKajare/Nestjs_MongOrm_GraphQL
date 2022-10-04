import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { CatType } from './dto/create-cat.dto';

export type CatDocument = CatType & Document;
export const CatSchema = SchemaFactory.createForClass(CatType);
