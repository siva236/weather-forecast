import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import moment from 'moment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [WeatherService]
})

export class AppComponent {
  data: any;
  isShowLoader: boolean = false;
  constructor(private weatherService: WeatherService ) {
    this.getweatherData();
  }
  cityName: string = 'Kakinada';
  getweatherData() {
    this.isShowLoader = true
    this.data = null;
    let data = {
      q: this.cityName,
      appid:'1635890035cbba097fd5c26c8ea672a1'
      }
      this.weatherService.getData(data).subscribe( {
      next: (response:any) => {
         if (response) {
          this.isShowLoader = false;
          this.modifyRawData(response);
          this.cityName = response.city.name;
        }
    },
    error: (err) => {
      this.isShowLoader = false;
      window.alert(err.message)
    }
  });
    
  }
  modifyRawData(data:any) {
   let weatherarray:any = [];
     data.list.forEach((ele:any) => {
      const date = moment(ele.dt_txt).format('MM/DD/YYYY');
      ele['date'] = date;
      if (weatherarray.length && !this.checkRecordAlreadyExist(weatherarray, date)) {
        weatherarray.push(ele)
      } 
      if (!weatherarray.length) {
          weatherarray.push(ele)  
      }
     })
     data = {...data, list: weatherarray};
     this.data = data;
  }
  checkRecordAlreadyExist(weatherarray = [], date:any) {
    return weatherarray.find((el:any) => date == el.date)
   }
  
}
