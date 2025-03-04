import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private http: HttpClient = inject(HttpClient);

  getCurrentWeather(city: string, unit = 'metric'): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/weather?q=${city}&units=${unit}&appid=${apiKey}`
    );
  }

  getForecast(city: string, unit = 'metric'): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/forecast?q=${city}&units=${unit}&appid=${apiKey}`
    );
  }
}
