import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}
   baseUrl: string = 'https://api.openweathermap.org/data/2.5/forecast';
  
  getData(data:any) {
    let params = new HttpParams();
    params = params.set('q',data.q).set('appid',data.appid)

    return this.http.get(this.baseUrl, {params:params}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
  
    if (error.status === 404) {
     
      console.error('An error occurred:', error.error);
    } else {
    
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error(error.error.message));
  }
    

}
