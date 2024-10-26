import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsOrdersComponent } from './vendors-orders.component';

describe('VendorsOrdersComponent', () => {
  let component: VendorsOrdersComponent;
  let fixture: ComponentFixture<VendorsOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorsOrdersComponent]
    });
    fixture = TestBed.createComponent(VendorsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
