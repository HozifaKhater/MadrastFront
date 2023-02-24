import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendartermsComponent } from './calendar-terms.component';

describe('CalendartermsComponent', () => {
    let component: CalendartermsComponent;
    let fixture: ComponentFixture<CalendartermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [CalendartermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(CalendartermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
