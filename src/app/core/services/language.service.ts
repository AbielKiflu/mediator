import { Injectable } from '@angular/core';
import { LanguageDto } from './languageDto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ 
  providedIn: 'root'
})
export class LanguageService {
  private baseUrl =`${environment.apiUrl}/languages`; 

  constructor(private http: HttpClient){}

  getLanguages(): Observable<LanguageDto[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<LanguageDto[]>(this.baseUrl);
  }

  getLanguageById(id: number): Observable<LanguageDto> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LanguageDto>(url);
  }
}
