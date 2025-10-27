import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CenterDto } from './centerDto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CenterService {

  private baseUrl = `${environment.apiUrl}/centers`; 

  constructor(private http: HttpClient){}

  getCenters(): Observable<CenterDto[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<CenterDto[]>(this.baseUrl);
  }

  getCenterById(id: number): Observable<CenterDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<CenterDto>(url);
  }
}
