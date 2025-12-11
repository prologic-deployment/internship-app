import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingScheduleFormComponent } from './meeting-schedule-form.component';

describe('MeetingScheduleFormComponent', () => {
  let component: MeetingScheduleFormComponent;
  let fixture: ComponentFixture<MeetingScheduleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingScheduleFormComponent]
    });
    fixture = TestBed.createComponent(MeetingScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
