import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
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

  @Put('/_create')
  async create(@Body() createCatDto: CatType): Promise<any> {
    return await this.catsService.create(createCatDto);
  }

  @Delete('/_delete')
  public async deletePost(@Query() query: any): Promise<any> {
    return await this.catsService.deletePost(query);

    // return await this.CatsService.search(query.q);
  }
  @Get()
  getPratik(): string {
    return this.catsService.getPratik();
  }
}

export class QueryParamDto {
  name: string;
}
