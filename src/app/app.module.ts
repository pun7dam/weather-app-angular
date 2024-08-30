import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { Forcast7DayComponent } from './components/forcast7-day/forcast7-day.component';
import Forcast24HourComponent from './components/forcast24-hour/forcast24-hour.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './modal-dialog/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    Forcast7DayComponent,
    Forcast24HourComponent,
    HeaderComponent,
    DialogComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
