import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenFailComponent } from './screen-fail.component';

describe('ScreenFailComponent', () => {
  let component: ScreenFailComponent;
  let fixture: ComponentFixture<ScreenFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
