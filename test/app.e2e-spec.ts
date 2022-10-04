// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';

// import { CatInput } from 'src/cats/inputs/cat.input';

// import { CatsModule } from '../src/cats/cats.module';
// import {
//   CREATE_Cat_MUTATION,
//   CREATE_Cat_OPERATION_NAME,
//   generateCreateCatVariables,
// } from '../src/cats/test/helpers/books.user.helper';
// import { AppModule } from '../src/app.module';
// import { CatsResolver } from '../src/cats/cats.resolver';
// import { CatsService } from '../src/cats/cats.service';

// describe('Cats resolver (e2e)', () => {
//   let app: INestApplication;
//   let cat: CatInput;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });
//   it('Should create an cat with cat mutation', () => {
//     const createCatInput = generateCreateCatVariables().createCatInput;
//     return request(app.getHttpServer())
//       .post('/graphql')
//       .send({
//         operationName: CREATE_Cat_OPERATION_NAME,
//         query: CREATE_Cat_MUTATION,
//         variables: { createCatInput },
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.data.createCat).toBeDefined();
//         cat = res.body.data.createCat;
//         expect(cat.id).toBeDefined();
//         expect(cat.name).toBe(createCatInput.name);
//         expect(cat.icon).toBe(createCatInput.icon);
//         expect(cat.description).toBe(createCatInput.description);
//         expect(cat.status).toBe(createCatInput.status);
//         expect(cat.updatedAt).toBe(createCatInput.updatedAt);
//         expect(cat.createdAt).toBe(createCatInput.createdAt);
//       });
//   });
// });
// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import request = require('supertest');
// // import { AppModule } from 'src/app.module';
// import { CatsModule } from '../src/cats/cats.module';
// import { AppModule } from '../src/app.module';

// describe('CustomerResolver (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();

//     await app.init();
//   });

//   afterAll(async () => {
//     await app.close();
//   });

//   const gql = '/graphql';

//   describe('createCustomer', () => {
//     it('should create a new customer', () => {
//       return request(app.getHttpServer())
//         .post(gql)
//         .send({
//           query:
//             'mutation {createCustomer(name: "John Doe", email: "john.doe@example.com", phone: "145677312965", address: "123 Road, Springfied, MO") {address name phone email}}',
//         })
//         .expect(200)
//         .expect((res) => {
//           expect(res.body.data.createCustomer).toEqual({
//             name: 'John Doe',
//             email: 'john.doe@example.com',
//             phone: '145677312965',
//             address: '123 Road, Springfied, MO',
//           });
//         });
//     });
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/graphql')
      .expect(200)
      .expect('Hello World!');
  });

  it('/graphql (POST) sayHello', () => {
    return (
      request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: '{hello}',
        })
        // .expect((res) => {
        //   expect(res.body.data).toEqual({ hello: 'helloo' });
        // });
        .expect({ hello: 'helloo' })
    );
  });
});
