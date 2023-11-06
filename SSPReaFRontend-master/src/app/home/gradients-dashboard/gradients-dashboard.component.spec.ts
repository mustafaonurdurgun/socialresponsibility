import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientsDashboardComponent } from './gradients-dashboard.component';

describe('GradientsDashboardComponent', () => {
  let component: GradientsDashboardComponent;
  let fixture: ComponentFixture<GradientsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradientsDashboardComponent]
    });
    fixture = TestBed.createComponent(GradientsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
