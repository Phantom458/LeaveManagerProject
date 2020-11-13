import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveValueComponent } from './leave-value.component';

describe('LeaveValueComponent', () => {
  let component: LeaveValueComponent;
  let fixture: ComponentFixture<LeaveValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
