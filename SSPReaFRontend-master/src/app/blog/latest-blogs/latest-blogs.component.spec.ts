import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBlogsComponent } from './latest-blogs.component';

describe('LatestBlogsComponent', () => {
  let component: LatestBlogsComponent;
  let fixture: ComponentFixture<LatestBlogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatestBlogsComponent]
    });
    fixture = TestBed.createComponent(LatestBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
