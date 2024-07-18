import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLikeLoaderComponent } from './product-like-loader.component';

describe('ProductLikeLoaderComponent', () => {
  let component: ProductLikeLoaderComponent;
  let fixture: ComponentFixture<ProductLikeLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductLikeLoaderComponent]
    });
    fixture = TestBed.createComponent(ProductLikeLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
