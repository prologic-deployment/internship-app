import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocsComponent } from './add-docs.component';

describe('AddDocsComponent', () => {
  let component: AddDocsComponent;
  let fixture: ComponentFixture<AddDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocsComponent]
    });
    fixture = TestBed.createComponent(AddDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
