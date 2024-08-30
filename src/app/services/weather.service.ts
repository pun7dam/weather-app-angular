import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '9a420aacc4a453b8b846e7a58fbaefca';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private http: HttpClient = inject(HttpClient);

  getCurrentWeather(city: string, unit = 'metric'): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/weather?q=${city}&units=${unit}&appid=${this.apiKey}`
    );
  }

  getForecast(city: string, unit = 'metric'): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/forecast?q=${city}&units=${unit}&appid=${this.apiKey}`
    );
  }
}
