import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventParticipantComponent } from './all-event-participant.component';

describe('AllEventParticipantComponent', () => {
  let component: AllEventParticipantComponent;
  let fixture: ComponentFixture<AllEventParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllEventParticipantComponent]
    });
    fixture = TestBed.createComponent(AllEventParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
