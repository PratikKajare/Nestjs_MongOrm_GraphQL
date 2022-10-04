import { Module } from '@nestjs/common';
import { SearchService } from '../search.service';
import { ProductElasticIndex } from '../constant/product.elastic.index';
import { SearchServiceInterface } from '../interface/search.service.interface';
import { PostSubscriber } from './product.subscriber';
import { MongooseModule } from '@nestjs/mongoose';
import { CatType } from 'src/cats/dto/create-cat.dto';

@Module({
  imports: [MongooseModule.forFeature.arguments([CatType])],
  providers: [
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
    ProductElasticIndex,
    PostSubscriber,
  ],
  controllers: [],
  exports: [],
})
export class SubscriberModule {}
