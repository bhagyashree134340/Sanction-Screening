import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadyTransactionsComponent } from './shady-transactions.component';

describe('ShadyTransactionsComponent', () => {
  let component: ShadyTransactionsComponent;
  let fixture: ComponentFixture<ShadyTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadyTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShadyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
