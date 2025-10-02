import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserLogin } from '../interfaces/userLogin';
import { UserLoginResponse } from '../interfaces/userLoginResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = `${environment.apiUrl}/center`; 
  private JWT_TOKEN : string = 'JwtToken';
  private ROLE : string = 'Role';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    
  constructor(private http: HttpClient){}

  private userRoleSubject = new BehaviorSubject<string | null>(this.getRoleFromStorage());
  userRole$ = this.userRoleSubject.asObservable();
  

  login(credentials: UserLogin): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap( (response:UserLoginResponse) => {

        this.storeToken(response.token);

        this.storeRole(response.role);

        this.isAuthenticatedSubject.next(true);
        this.userRoleSubject.next(this.ROLE);
      })
    );
  }


  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.ROLE);
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  private getRoleFromStorage(): string | null {
    return localStorage.getItem(this.ROLE);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private storeRole(role : string): void {
    if (role) {
      localStorage.setItem(this.JWT_TOKEN, role);
    } else {
      localStorage.removeItem(this.ROLE);
    }
  }
}