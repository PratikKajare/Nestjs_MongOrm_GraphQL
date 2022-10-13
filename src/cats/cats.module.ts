import { Module } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { SearchService } from 'src/search/search.service';
import { CatController } from './cat.controller';
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
  providers: [
    // {
    //   provide: 'SearchServiceInterface',
    //   useClass: SearchService,
    // },
    CatsResolver,
    CatsService,
    SearchService,
    ElasticsearchService,
  ],
  controllers: [CatController],
})
export class CatsModule {}
