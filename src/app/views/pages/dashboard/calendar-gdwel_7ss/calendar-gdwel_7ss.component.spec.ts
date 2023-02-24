import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { gdwel_7ssComponent } from './calendar-gdwel_7ss.component';

describe('CalendarComponent', () => {
  let component: gdwel_7ssComponent;
  let fixture: ComponentFixture<gdwel_7ssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ gdwel_7ssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(gdwel_7ssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
