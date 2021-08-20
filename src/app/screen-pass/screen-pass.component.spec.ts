import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPassComponent } from './screen-pass.component';

describe('ScreenPassComponent', () => {
  let component: ScreenPassComponent;
  let fixture: ComponentFixture<ScreenPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
