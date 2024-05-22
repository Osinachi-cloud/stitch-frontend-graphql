import { TestBed } from '@angular/core/testing';

import { ProductlikesService } from './productlikes.service';

describe('ProductlikesService', () => {
  let service: ProductlikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductlikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
