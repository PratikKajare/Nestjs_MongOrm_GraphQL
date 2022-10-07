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
  constructor(private eService: ElasticsearchService) {
    super(ConfigSearch.searchConfig(process.env.ELASTIC_SEARCH_URL));
  }
  public async searchIndex(searchData: any): Promise<any> {
    return await this.search({
      index: productIndex._index,
      body: {
        query: {
          match: searchData,
        },
      },
    })
      .then((res) => {
        return res.hits.hits;
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
  // public async insertIndex(bulkData: any): Promise<any> {
  //   await this.eService.indices
  //     .putMapping(
  //       {
  //         index: productIndex._index,
  //         body: {
  //           properties: {
  //             bulkData,
  //           },
  //         },
  //       },
  //       { ignore: [400] },
  //     )
  //     .then(function (response) {
  //       console.log('Response: ', response);
  //     })
  //     .catch(function (error) {
  //       console.log('putMapping Error: ', error);
  //     });
  // }
  public async insertIndex(bulkData: any): Promise<any> {
    return await this.bulk({
      body: [bulkData],

      // _source: [bulkData],
      // require_alias: bulkData,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
  //   async insertIndex(bulkData: any) {
  //     // const checkIndex = await this.eService.indices.exists({ index: productIndex._index});

  //     return this.eService.indices.create({
  //       index: productIndex._index,
  //       body: {
  //         mappings: {
  //           properties: {
  //             title: {
  //               type: 'text',
  //               fields: {
  //                 complete: {
  //                   type: 'text',
  //                   analyzer: 'autocomplete_analyzer',
  //                   search_analyzer: 'autocomplete_search_analyzer',
  //                 },
  //               },
  //             },
  //             year: { type: 'integer' },
  //             genres: { type: 'nested' },
  //             actors: { type: 'nested' },
  //           },
  //         },
  //       },
  //     });
  //   }
  //   parseAndPrepareData() {
  //     throw new Error('Method not implemented.');
  //   }
  // }
  // public async insertIndex(bulkData: any): Promise<any> {
  //   return await this.eService.index({
  //     index: productIndex._index,
  //     id: bulkData.id,
  //     pretty: true,
  //     body: bulkData.toIndex(),
  //     document: JSON,
  //     error_trace: true,
  //   });
  // }

  //   public async updateIndex(updateData: any): Promise<any> {
  //     return await this.update(updateData)
  //       .then(res => res)
  //       .catch(err => {
  //         throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
  //       });
  //   }

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
