import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatType } from './dto/create-cat.dto';

@Controller('graphql')
export class CatController {
  constructor(private readonly catsService: CatsService) {}
  @Get('/search')
  public async search(@Query() q: any): Promise<any> {
    return await this.catsService.search(q);
    // return await this.CatsService.search(query.q);
  }

  @Post('/create')
  async create(@Body() createCatDto: CatType): Promise<any> {
    return await this.catsService.create(createCatDto);
  }
  @Get()
  getPratik(): string {
    return this.catsService.getPratik();
  }
}
