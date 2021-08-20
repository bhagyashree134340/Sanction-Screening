import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPassComponent } from './validation-pass.component';

describe('ValidationPassComponent', () => {
  let component: ValidationPassComponent;
  let fixture: ComponentFixture<ValidationPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
