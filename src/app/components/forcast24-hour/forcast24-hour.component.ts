import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forcast24-hour',
  templateUrl: './forcast24-hour.component.html',
  styleUrls: ['./forcast24-hour.component.css'],
})
export default class Forcast24HourComponent {
  @Input() hourlyForecast: any[] = [];
}
