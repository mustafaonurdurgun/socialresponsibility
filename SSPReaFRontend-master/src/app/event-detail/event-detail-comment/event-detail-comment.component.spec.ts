import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailCommentComponent } from './event-detail-comment.component';

describe('EventDetailCommentComponent', () => {
  let component: EventDetailCommentComponent;
  let fixture: ComponentFixture<EventDetailCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventDetailCommentComponent]
    });
    fixture = TestBed.createComponent(EventDetailCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
