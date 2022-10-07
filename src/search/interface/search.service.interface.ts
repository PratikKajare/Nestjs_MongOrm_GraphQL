import { CatType } from 'src/cats/dto/create-cat.dto';

export interface SearchServiceInterface<T> {
  insertIndex(bulkData: CatType): Promise<T>;

  // updateIndex(updateData: T): Promise<T>;

  searchIndex(searchData: T): Promise<T>;

  // deleteIndex(indexData: T): Promise<T>;

  // deleteDocument(indexData: T): Promise<T>;
}
