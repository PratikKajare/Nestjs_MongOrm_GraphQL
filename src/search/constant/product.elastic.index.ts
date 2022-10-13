import { Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '../interface/search.service.interface';
import { CatType } from 'src/cats/dto/create-cat.dto';
import { productIndex } from './product.elastic';

@Injectable()
export class ProductElasticIndex {
  // productDocument: any;
  constructor(
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

  // public async insertProductDocument(categorys: CatType): Promise<any> {
  //   const data = this.productDocument(categorys);
  //   return await this.searchService.insertIndex(data);
  // }

  // public async updateProductDocument(product: CatType): Promise<any> {
  //   const data = this.productDocument(product);
  //   await this.deleteProductDocument(product.id);
  //   return await this.searchService.insertIndex(data);
  // }
  // deleteProductDocument(id: string) {
  //   throw new Error('Method not implemented.');
  // }
  private bulkIndex(categoryId: string): any {
    return {
      _index: productIndex._index,
      _type: productIndex._type,
      _id: categoryId,
    };
  }

  private productDocument(categorys: CatType): any {
    const bulk = [];
    bulk.push({
      index: this.bulkIndex(categorys.id),
    });
    bulk.push(categorys);
    return {
      body: bulk,
      index: productIndex._index,
      type: productIndex._type,
    };
  }
}
