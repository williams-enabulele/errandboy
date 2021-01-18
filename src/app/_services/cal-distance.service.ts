import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})



export class CalDistanceService {



  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://errandboyservices.com/',
      'Access-Control-Allow-Method': 'GET'
      //'Content-Type': 'application/json'
    })
  }



  proxy_url = 'https://cors-anywhere.herokuapp.com/';
  url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric';
  key = 'AIzaSyA8TctKdNfvbEDpegU1uz8De07__biGdVw';


  constructor(
    private http: HttpClient
  ) { }


  async calDistance(origin: string, destination: string) {

    return this.http.get(`${this.proxy_url + this.url}&origins=${origin}&destinations=${destination}&key=${this.key}`);

    // await this.http.get('https://jsonplaceholder.typicode.com/todos/',httpOptions).subscribe(res=>{
    //   console.log(res)
    // });

  }






}
