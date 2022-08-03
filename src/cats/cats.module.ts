import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { CatsResolver } from './cats.resolver';
import { CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'categorys',
        schema: CatSchema,
      },
    ]),
  ],
  providers: [CatsResolver, CatsService],
})
export class CatsModule {}
