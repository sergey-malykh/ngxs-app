import { async, TestBed } from '@angular/core/testing';
import { DataAccessProductsModule } from './data-access-products.module';

describe('PizzaDataAccessProductsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessProductsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessProductsModule).toBeDefined();
  });
});
