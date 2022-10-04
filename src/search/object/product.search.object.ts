import { productIndex } from '../constant/product.elastic';

export class ElasticSearchBody {
  size: number;
  from: number;
  query: any;

  constructor(size: number, from: number, query: any) {
    this.size = size;
    this.from = from;
    this.query = query;
  }
}

export class ProductSearchObject {
  public static searchObject(q: any) {
    const body = this.elasticSearchBody(q);
    return { index: productIndex._index, body, q };
  }

  public static elasticSearchBody(q: any): ElasticSearchBody {
    const query = {
      match: {
        query: q,
        fields: [
          'name',
          'description',
          'icon',
          'status',
          'updatedAt',
          'createdAt',
        ],
      },
    };
    return new ElasticSearchBody(10, 0, query);
  }
}
