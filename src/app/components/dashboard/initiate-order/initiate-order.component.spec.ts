import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateOrderComponent } from './initiate-order.component';

describe('InitiateOrderComponent', () => {
  let component: InitiateOrderComponent;
  let fixture: ComponentFixture<InitiateOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitiateOrderComponent]
    });
    fixture = TestBed.createComponent(InitiateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
