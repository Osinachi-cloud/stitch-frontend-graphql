import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlikesComponent } from './productlikes.component';

describe('ProductlikesComponent', () => {
  let component: ProductlikesComponent;
  let fixture: ComponentFixture<ProductlikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductlikesComponent]
    });
    fixture = TestBed.createComponent(ProductlikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
