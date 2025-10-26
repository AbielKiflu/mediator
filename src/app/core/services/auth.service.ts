import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserLogin } from '../../features/user/userLogin';
import { UserLoginResponse } from '../../features/user/userLoginResponse';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.apiUrl; 
  private readonly JWT_TOKEN : string = 'jwt_token';
  private readonly ROLE : string = 'role';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    private userRoleSubject = new BehaviorSubject<string | null>(this.getRoleFromStorage());
  userRole$ = this.userRoleSubject.asObservable();
    
  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  login(credentials: UserLogin): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap( (response:UserLoginResponse) => {

        this.storeToken(response.token);

        this.storeRole(response.role);

        this.isAuthenticatedSubject.next(true);
        this.userRoleSubject.next(this.ROLE);
         this.router.navigate(['./users']);
      })
    );
  }


  logout(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.ROLE);
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next(null);
     this.router.navigate(['./login']);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  getTokenFromStorage(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  private getRoleFromStorage(): string | null {
    return localStorage.getItem(this.ROLE);
  }

  private hasToken(): boolean {
    return !!this.getTokenFromStorage();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private storeRole(role : string): void {
    if (role) {
      localStorage.setItem(this.ROLE, role);
    } else {
      localStorage.removeItem(this.ROLE);
    }
  }
}