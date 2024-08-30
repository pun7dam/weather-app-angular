import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forcast7-day',
  templateUrl: './forcast7-day.component.html',
  styleUrls: ['./forcast7-day.component.css'],
})
export class Forcast7DayComponent {
  @Input() dailyForecast: any[] = [];
}
