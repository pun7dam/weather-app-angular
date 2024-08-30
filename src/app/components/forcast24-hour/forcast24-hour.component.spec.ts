import { ComponentFixture, TestBed } from '@angular/core/testing';

import Forcast24HourComponent from './forcast24-hour.component';

describe('Forcast24HourComponent', () => {
  let component: Forcast24HourComponent;
  let fixture: ComponentFixture<Forcast24HourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Forcast24HourComponent],
    });
    fixture = TestBed.createComponent(Forcast24HourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
