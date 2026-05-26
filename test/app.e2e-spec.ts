import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  // Starts the test app before each test.
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Checks the root route response.
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        storeName: 'Muncher store',
        message: 'Welcome to the main store handler.',
        departments: [
          'produce-food',
          'tech',
          'clothing',
          'lifestyle',
          'furniture',
        ],
      });
  });

  // Closes the test app after each test.
  afterEach(async () => {
    await app.close();
  });
});
