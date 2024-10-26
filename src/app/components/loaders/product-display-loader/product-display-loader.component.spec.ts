import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDisplayLoaderComponent } from './product-display-loader.component';

describe('ProductDisplayLoaderComponent', () => {
  let component: ProductDisplayLoaderComponent;
  let fixture: ComponentFixture<ProductDisplayLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDisplayLoaderComponent]
    });
    fixture = TestBed.createComponent(ProductDisplayLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
