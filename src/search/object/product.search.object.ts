import { CatType } from 'src/cats/dto/create-cat.dto';
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
      query: {
        match: {
          url: q,
        },
      },
    };
    return new ElasticSearchBody(55, 0, query);
  }
}
