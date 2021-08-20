import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFailComponent } from './validation-fail.component';

describe('ValidationFailComponent', () => {
  let component: ValidationFailComponent;
  let fixture: ComponentFixture<ValidationFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
