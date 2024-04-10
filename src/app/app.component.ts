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
  constructor(private weatherService: WeatherService ) {
    this.getweatherData();
  }
  cityName: string = 'Kakinada';
  getweatherData() {
    let data = {
      q: this.cityName,
      appid:'1635890035cbba097fd5c26c8ea672a1'
      }
  
    setTimeout(() => {
      this.weatherService.getData(data).subscribe( {
      next: (response:any) => {
         if (response) {
          this.modifyRawData(response);
          this.cityName = response.city.name;
        }
    },
    error: (err) => {
      console.log(err)
      window.alert(err.message)
    }
  }
       );

    }, 1000)
  }
  modifyRawData(data:any) {
   let weatherarray:any = [];
     data.list.forEach((ele:any) => {
      const date = ele.dt_txt.split(' ')[0];
      ele['date'] = moment(date).format('MM/DD/YYYY');;
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
    const finding =weatherarray.find((el:any) => date == el.dt_txt.split(' ')[0])
    return finding;
   }
  
}
