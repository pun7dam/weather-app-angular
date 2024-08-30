import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import Chart from 'chart.js/auto';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  @ViewChild('tempRangeCanvas') tempRangeCanvas!: ElementRef;
  @ViewChild('hourlyTempCanvas') hourlyTempCanvas!: ElementRef;

  city: string = 'sydney'; //default
  currentWeather: any;
  hourlyForecast!: any[];
  dailyForecast!: any[];

  state: boolean = false;
  error = {
    code: '',
    message: '',
  };

  showDialog = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeatherData();
  }
  clearTextField() {
    this.city = '';
  }

  getWeather() {
    if (this.city == '') {
      this.showDialog = !this.showDialog;
      return;
    }
    this.getWeatherData();
  }
  getWeatherData() {
    this.weatherService.getCurrentWeather(this.city).subscribe(
      (data) => {
        this.currentWeather = data;
        console.log(this.currentWeather);
        this.state = true;
      },
      (error) => {
        this.handleError(error);
      }
    );

    this.weatherService.getForecast(this.city).subscribe(
      (data) => {
        this.hourlyForecast = data.list.slice(0, 8); // 24 hours (3-hour steps)
        this.dailyForecast = this.getDailyForecast(data.list);
        this.state = true;

        this.createTemperatureRangeChart();
        this.createHourlyTemperatureChart();
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      this.state = false;
      this.error.code = '4XX';
      this.error.message = error.error.message;
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      this.state = false;
      this.error.code = error.status;
      this.error.message = error.message;
    }
    //console.log(errorMessage);
    return throwError(() => {
      console.log(errorMessage);
      return errorMessage;
    });
  }

  getDailyForecast(list: any[]): any[] {
    const dailyData: any[] = [];
    const dates: Set<string> = new Set();

    for (const item of list) {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dates.has(date) && dailyData.length < 7) {
        dates.add(date);
        dailyData.push(item);
      }
    }

    return dailyData;
  }

  createTemperatureRangeChart() {
    const ctx = this.tempRangeCanvas.nativeElement.getContext('2d');

    const labels = this.dailyForecast.map((day) =>
      new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })
    );
    const minTemps = this.dailyForecast.map((day) => day.main.temp_min);
    const maxTemps = this.dailyForecast.map((day) => day.main.temp_max);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Min Temperature',
          data: minTemps,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Max Temperature',
          data: maxTemps,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: '7-Day Temperature Range',
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Temperature (°C)',
            },
          },
          x: {
            stacked: false,
          },
        },
      },
    });
  }

  createHourlyTemperatureChart() {
    const ctx = this.hourlyTempCanvas.nativeElement.getContext('2d');

    const labels = this.hourlyForecast.map((hour) =>
      new Date(hour.dt * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
    const temperatures = this.hourlyForecast.map((hour) => hour.main.temp);

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Hourly Temperature',
          data: temperatures,
          fill: false,
          borderColor: 'rgb(75, 132, 255)',
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };

    new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: '24-Hour Temperature Forecast',
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10,
              },
            },
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Temperature (°C)',
            },
          },
        },
      },
    });
  }
}
