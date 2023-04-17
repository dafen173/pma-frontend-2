import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user-interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { NewUser } from '../models/new-user-interface';
import { CreatedUser } from '../models/res-created-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null;

  constructor(private http: HttpClient) {
  }

  currentUser$ = new BehaviorSubject<CreatedUser | null | undefined>(
    undefined
  );

  getCurrentUser(): Observable<CreatedUser> {
    return this.http.get<CreatedUser>('http://127.0.0.1:3000/users');
  }

  setCurrentUser(currentUser: CreatedUser | null): void {
    this.currentUser$.next(currentUser);
  }

  logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-id');
    this.currentUser$.next(null);
  }

  register(newUser: NewUser): Observable<CreatedUser>{
    return this.http.post<CreatedUser>('http://127.0.0.1:3000/auth/signup', newUser)
      .pipe(
        tap(
          ({_id}) => {
            if(_id !== null) {
              localStorage.setItem('user-id', _id);
            }

          }
        )
      );
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('http://127.0.0.1:3000/auth/signin', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token);
            this.setToken(token);
          }
        )
      );
  }

  setToken(token: string | null) {
    this.token = 'Bearer ' + token;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth-token');
  }
}
