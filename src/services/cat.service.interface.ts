export interface CatSearchServiceInterface<T> {
  search(q: T): Promise<any>;
  insertIndex(bulkData: T): Promise<T>;
  // updateIndex(updateData: T): Promise<T>;

  searchIndex(searchData: T): Promise<T>;

  // deleteIndex(indexData: T): Promise<T>;

  // deleteDocument(indexData: T): Promise<T>;
}
