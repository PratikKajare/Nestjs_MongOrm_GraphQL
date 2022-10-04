import { Mutation, Query } from '@nestjs/graphql';
import { Args, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CatType } from './dto/create-cat.dto';
import { CatInput, ListPersonInput } from './inputs/cat.input';

@Resolver()
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'helloo';
  }

  @Query(() => [CatType])
  async cats() {
    return this.catsService.findAll();
  }

  @Query((returns) => CatType)
  catByID(@Args('id') id: string) {
    return this.catsService.getcat(id);
  }

  @Mutation((returns) => CatType)
  async createCat(@Args('inputg') input: CatInput) {
    return await this.catsService.createCat(input);
  }

  @Mutation(() => CatType)
  async deleteCAt(@Args('id') id: string) {
    return await this.catsService.deletePost(id);
  }

  @Mutation((returns) => CatType)
  async updateMe(@Args('id') id: string, @Args('input') input: CatInput) {
    return await this.catsService.updatePost(id, input);
  }

  @Query(() => [CatType])
  async status(@Args('filters', { nullable: true }) filters?: ListPersonInput) {
    return this.catsService.list(filters);
  }
}
