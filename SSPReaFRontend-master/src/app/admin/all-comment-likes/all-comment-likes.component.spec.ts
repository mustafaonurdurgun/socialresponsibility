import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCommentLikesComponent } from './all-comment-likes.component';

describe('AllCommentLikesComponent', () => {
  let component: AllCommentLikesComponent;
  let fixture: ComponentFixture<AllCommentLikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCommentLikesComponent]
    });
    fixture = TestBed.createComponent(AllCommentLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
