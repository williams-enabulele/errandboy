import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* var distance = require('google-distance-matrix');
distance.key('AIzaSyA8TctKdNfvbEDpegU1uz8De07__biGdVw');
distance.units('imperial'); */

//const  headers = new  HttpHeaders().set("Origin", "https://errandboyservices.com/");



@Injectable({
  providedIn: 'root'
})



export class CalDistanceService {



   //Http Options
    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://errandboyservices.com/',
      'Acceess-Control-Allow-Headers':'Origin,X-requested-With,Content-Type,Accept',
      'Cross-Origin-Resource-Policy':'cross-origin'

    })
  }; 
 /* 
  proxy_url = 'https://cors-anywhere.herokuapp.com/';
  url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric';
  key = 'AIzaSyA8TctKdNfvbEDpegU1uz8De07__biGdVw'; */
  myurl="https://errandboyservices.com/errandboy_api/controllers/pricing/calc.php";


  constructor(
    private http: HttpClient
  ) { }


  async calDistance(origin: string, destination: string) {


    return this.http.get(`${this.myurl}?origins=${origin}&destinations=${destination}`);
   

  }







}
