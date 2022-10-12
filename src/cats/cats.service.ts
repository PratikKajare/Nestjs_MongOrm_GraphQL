import mongoose, { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { ListPersonInput } from './inputs/cat.input';

import { v4 as uuid } from 'uuid';
import { CatType } from './dto/create-cat.dto';
import { SearchServiceInterface } from 'src/search/interface/search.service.interface';
// import { ProductSearchObject } from 'src/search/object/product.search.object';
import { QueryParamDto } from './cat.controller';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel('categorys') private catModel: Model<Cat>,
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

  public async search(q: QueryParamDto): Promise<any> {
    // const data = ProductSearchObject.searchObject(q);
    // console.log(data);
    return await this.searchService.searchIndex(q);
  }

  public async create(createCatDto: CatType): Promise<any> {
    const { name, icon, description, status, updatedAt, createdAt } =
      createCatDto;
    // console.log(name, icon, description, status, updatedAt, createdAt);
    const bulkData = new this.catModel({
      id: uuid(),
      name,
      icon,
      description,
      status,
    });

    await bulkData.save();
    console.log(bulkData);

    await this.searchService.insertIndex(bulkData);
    // return bulkData;
  }

  getPratik(): string {
    return 'Pratik Kajare!';
  }

  async getcat(id: string): Promise<Cat> {
    return await this.catModel.findOne({ id });
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async createCat(createCatDto: CatType): Promise<Cat> {
    const { name, icon, description, status, updatedAt, createdAt } =
      createCatDto;
    console.log(name, icon, description, status, updatedAt, createdAt);

    const categorys = new this.catModel({
      id: uuid(),
      name,
      icon,
      description,
      status,
      updatedAt,
      createdAt,
    });
    const bulkData = await categorys.save();
    await this.searchService.insertIndex(bulkData); //elastic
    return bulkData;
  }

  async deletePost(id: string): Promise<Cat> {
    return await this.searchService.deleteIndex({ id }); //elastic
    // return await this.catModel.findOneAndDelete({ id });
  }

  async updatePost(id: String, createCatDto: CatType): Promise<Cat> {
    const { name, icon, description, status, updatedAt, createdAt } =
      createCatDto;
    const category = await this.catModel.findOne({ id });
    if (name) {
      category.name = createCatDto.name;
    }
    if (icon) {
      category.icon = createCatDto.icon;
    }
    if (description) {
      category.description = createCatDto.description;
    }
    if (status) {
      category.status = createCatDto.status;
    }
    if (updatedAt) {
      category.updatedAt = createCatDto.updatedAt;
    }
    if (createdAt) {
      category.createdAt = createCatDto.createdAt;
    }
    return category.save();
  }

  async list(filters: ListPersonInput) {
    return this.catModel.find({ ...filters }).exec();
  }
}
