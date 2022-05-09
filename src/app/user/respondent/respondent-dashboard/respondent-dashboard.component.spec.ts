import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondentDashboardComponent } from './respondent-dashboard.component';

describe('RespondentDashboardComponent', () => {
  let component: RespondentDashboardComponent;
  let fixture: ComponentFixture<RespondentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespondentDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
