import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { KeyObject } from 'crypto';
import { CatsService } from './cats.service';
import { CatType } from './dto/create-cat.dto';

@Controller('esService')
export class CatController {
  constructor(private readonly catsService: CatsService) {}
  @Get('/_search')
  public async search(@Query() query: any): Promise<any> {
    return await this.catsService.search(query);

    // return await this.CatsService.search(query.q);
  }

  @Put('/_bulk')
  async create(@Body() createCatDto: CatType): Promise<any> {
    return await this.catsService.create(createCatDto);
  }
  @Get()
  getPratik(): string {
    return this.catsService.getPratik();
  }
}

export class QueryParamDto {
  name: string;
}
