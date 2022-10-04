import * as Chance from 'chance';
import { CatInput } from '../inputs/cat.input';

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
