import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { ProductElasticIndex } from '../constant/product.elastic.index';
import { InjectConnection } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CatType } from 'src/cats/dto/create-cat.dto';

@Injectable()
export class PostSubscriber implements EntitySubscriberInterface<CatType> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly productEsIndex: ProductElasticIndex,
  ) {
    connection.subscribers.push(this);
  }

  public listenTo(): any {
    return CatType;
  }

  public async afterInsert(event: InsertEvent<CatType>): Promise<any> {
    return await this.productEsIndex.insertProductDocument(event.entity);
  }

  //   public async afterUpdate(event: UpdateEvent<Product>): Promise<any> {
  //     return await this.productEsIndex.updateProductDocument(event.entity);
  //   }
}
