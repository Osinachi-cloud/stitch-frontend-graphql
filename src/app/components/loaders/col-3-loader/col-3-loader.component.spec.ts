import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Col3LoaderComponent } from './col-3-loader.component';

describe('Col3LoaderComponent', () => {
  let component: Col3LoaderComponent;
  let fixture: ComponentFixture<Col3LoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Col3LoaderComponent]
    });
    fixture = TestBed.createComponent(Col3LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
