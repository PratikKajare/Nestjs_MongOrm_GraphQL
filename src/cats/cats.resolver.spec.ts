import { Test, TestingModule } from '@nestjs/testing';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import * as Chance from 'chance';
import { CatInput } from './inputs/cat.input';
import mongoose from 'mongoose';
describe('CatsResolver', () => {
  let resolver: CatsResolver;

  const chance = new Chance();
  const id = new mongoose.Types.ObjectId(); //this will be reused across our tests
  const createTestInput: CatInput = {
    name: chance.name(),
    icon: chance.last(),
    description: chance.name(),
    status: chance.name(),
    updatedAt: chance.string(),
    createdAt: chance.string(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsResolver,
        {
          provide: CatsService,
          useValue: {
            create: jest.fn(() => {
              return {
                id: id,
                ...createTestInput,
              };
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<CatsResolver>(CatsResolver);
  });

  it('should be able to create an user', async () => {
    const user = await resolver.createCat(createTestInput);
    expect(user.id).toBeDefined();
    expect(user.id).toBe(id);
    expect(user.name).toBe(createTestInput.name);
    expect(user.icon).toBe(createTestInput.icon);
    expect(user.description).toBe(createTestInput.description);
    expect(user.status).toBe(createTestInput.status);
    expect(user.updatedAt).toBe(createTestInput.updatedAt);
    expect(user.createdAt).toBe(createTestInput.createdAt);
  });
});
