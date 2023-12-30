import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRequestFormComponent } from './password-request-form.component';

describe('PasswordRequestFormComponent', () => {
  let component: PasswordRequestFormComponent;
  let fixture: ComponentFixture<PasswordRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRequestFormComponent]
    });
    fixture = TestBed.createComponent(PasswordRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
