import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCards1Component } from './home-cards1.component';

describe('HomeCards1Component', () => {
  let component: HomeCards1Component;
  let fixture: ComponentFixture<HomeCards1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCards1Component]
    });
    fixture = TestBed.createComponent(HomeCards1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
