import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CatSchema } from './cats.schema';
import { CatsService } from './cats.service';
import { closeInMongodConnection, rootMongooseTestModule } from './common/helpers/mongoose.helper';
import * as Chance from 'chance';
import { CatInput } from './inputs/cat.input';

const chance = new Chance();
let id = ''; //this will be reused across our tests
const createTestInput: CatInput = {
    name: chance.name(),
    icon: chance.last(),
    description: chance.name(),
    status: chance.name(),
    updatedAt: chance.string(),
    createdAt: chance.string(),
};

describe('CatsService', () => {
    let service: CatsService;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                MongooseModule.forFeature([
                    {
                        name: 'categorys',
                        schema: CatSchema,
                    },
                ]),
            ],
            providers: [CatsService],
        }).compile();

        service = module.get<CatsService>(CatsService);
    });

    afterAll(async () => {
        if (module) {
            await module.close();
            await closeInMongodConnection();
        }
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create an user with createUserInput', async () => {
        const user = await service.createCat(createTestInput);
        expect(user.id).toBeDefined();
        expect(user.name).toBe(createTestInput.name);
        expect(user.icon).toBe(createTestInput.icon);
        expect(user.description).toBe(createTestInput.description);
        expect(user.updatedAt).toBe(createTestInput.updatedAt);
        expect(user.createdAt).toBe(createTestInput.createdAt);
        id = user.id;
    });
});
