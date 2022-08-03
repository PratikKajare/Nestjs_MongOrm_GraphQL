import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './interfaces/cat.interface';
import { CatInput, ListPersonInput } from './inputs/cat.input';

import { v4 as uuid } from 'uuid';
import { CatType } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel('categorys') private catModel: Model<Cat>) {}

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
    await categorys.save();
    return categorys;
  }

  async deletePost(id: string): Promise<Cat> {
    return await this.catModel.findOneAndDelete({ id });
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
