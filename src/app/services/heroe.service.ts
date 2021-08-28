import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

  baseUrl = environment.baseUri

  constructor( private _http: HttpClient ) {
    console.log( this.baseUrl )
  }

  getHeroes(): Observable<any[]>{
    return this._http.get<any>(`${this.baseUrl}/heroes`);
  }

  getHeroe(): Observable<any[]>{
    return this._http.get<any>(`${this.baseUrl}/heroes/1`);
  }

  voteHeroe(data:any): Observable<any[]> {
    return this._http.put<any>(`${this.baseUrl}/heroes/${data.id}`, data);
  }

}
