import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forcast7DayComponent } from './forcast7-day.component';

describe('Forcast7DayComponent', () => {
  let component: Forcast7DayComponent;
  let fixture: ComponentFixture<Forcast7DayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Forcast7DayComponent]
    });
    fixture = TestBed.createComponent(Forcast7DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
