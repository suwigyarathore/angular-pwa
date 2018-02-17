import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';
import { Tea } from './logic/Tea';
import { Http } from '@angular/http';

@Injectable()
export class DataService {
  endpoint: string = "http://localhost:3000/"

  constructor (private http: Http) { }

  get (teaId: string, callback) {
    this.http.get(`${ this.endpoint }teas/${ teaId }`)
      .subscribe(response => callback(response.json()));
  }
  getList (callback) {
    this.http.get(`${ this.endpoint }teas`).subscribe(res => callback(res.json()));
  }

  save (tea, callback) {
    if (tea._id) {
      // Its a update
      this.http.put(`${ this.endpoint }teas/${ tea._id }`, tea)
        .subscribe(response => callback(true));
    } else {
      this.http.post(`${ this.endpoint }teas`, tea)
        .subscribe(response => callback(true));
    }
  }

}
