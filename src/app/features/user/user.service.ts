import { Injectable } from '@angular/core';
import { UserDto } from '../../core/interfaces/userDto';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  private mapUser(u: any): UserDto {
    return {
      firstName: u.firstName ?? '',
      lastName: u.lastName ?? '',
      telephone: u.telephone ?? '',
      email: u.email ?? '',
      pauseStartDate: u.pauseStartDate ? new Date(u.pauseStartDate) : undefined,
      pauseEndDate: u.pauseEndDate ? new Date(u.pauseEndDate) : undefined,
      googleId: u.googleId ?? undefined,
      center: u.center,
      userRole: u.userRole,
      languages: u.languages ?? []
    };
  }
  
  getUsers(): Observable<UserDto[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/filter?role=1`)
      .pipe(
        map(response => response.map(this.mapUser))
      );
  }

}
