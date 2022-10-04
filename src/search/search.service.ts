import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { SearchServiceInterface } from './interface/search.service.interface';
import { ConfigSearch } from './config/config.search';
import { productIndex } from './constant/product.elastic';

@Injectable()
export class SearchService
  extends ElasticsearchService
  implements SearchServiceInterface<any>
{
  constructor(private readonly eService: ElasticsearchService) {
    super(ConfigSearch.searchConfig(process.env.ELASTIC_SEARCH_URL));
  }
  public async insertIndex(bulkData: any): Promise<any> {
    return await this.bulk(bulkData)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
  // public async insertIndex(bulkData: any): Promise<any> {
  //   return await this.bulk(bulkData)
  //     .then((res) => res)
  //     .catch((err) => {
  //       console.log(err);
  //       throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //     });
  // }
  // public async insertIndex(bulkData: any): Promise<any> {
  //   return await this.eService.index({
  //     index: productIndex._index,
  //     body: bulkData,
  //     document: JSON,
  //   });
  // }

  //   public async updateIndex(updateData: any): Promise<any> {
  //     return await this.update(updateData)
  //       .then(res => res)
  //       .catch(err => {
  //         throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //       });
  //   }

  public async searchIndex(searchData: any): Promise<any> {
    return await this.search(searchData)
      .then((res) => {
        return res.hits.hits;
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  //   public async deleteIndex(indexData: any): Promise<any> {
  //     return await this.indices.delete(indexData).then(res => res)
  //       .catch(err => {
  //         throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //       });
  //   }

  //   public async deleteDocument(indexData: any): Promise<any> {
  //     return await this.delete(indexData).then(res => res)
  //       .catch(err => {
  //         throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //       });
  //   }
}
