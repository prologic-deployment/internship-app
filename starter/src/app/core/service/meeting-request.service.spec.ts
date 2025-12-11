import { TestBed } from '@angular/core/testing';

import { MeetingRequestService } from './meeting-request.service';

describe('MeetingRequestService', () => {
  let service: MeetingRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeetingRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
