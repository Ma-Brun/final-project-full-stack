import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  // Prepares the controller before each test.
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    // Checks the root overview response.
    it('should return the store overview', () => {
      expect(appController.getStoreOverview()).toEqual({
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
  });
});
