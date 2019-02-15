import { async, TestBed } from '@angular/core/testing';
import { FeatureProductsModule } from './feature-products.module';

describe('FeatureProductsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureProductsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureProductsModule).toBeDefined();
  });
});
