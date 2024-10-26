import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLoaderComponent } from './cart-loader.component';

describe('CartLoaderComponent', () => {
  let component: CartLoaderComponent;
  let fixture: ComponentFixture<CartLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartLoaderComponent]
    });
    fixture = TestBed.createComponent(CartLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
