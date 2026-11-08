import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, switchMap, tap, catchError, throwError } from 'rxjs';

import { User } from '../interfaces/user.interface';

interface AuthToken {
  access_token: string;
  token_type: string
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly apiUrl = 'http://127.0.0.1:8000/auth';
  private readonly tokenKey = 'access_token';

  private readonly _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();

  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  readonly isLoggedIn = () => this._currentUser() != null;

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  register(user: RegisterData): Observable<User> {
   return this.http.post<User>(
     `${this.apiUrl}/register`, user);
  }

  login(email: string, password: string): Observable<User> {
    const body = new HttpParams()
      .set('username', email)
      .set('password', password);

    return this.http.post<AuthToken>(
      `${this.apiUrl}/login`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    ).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.access_token);
      }),
      switchMap(() => this.getCurrentUser()),
      catchError(error => {
        this.logout();
	      return throwError(() => error);
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem(this.tokenKey);

    return this.http.get<User>(
      `${this.apiUrl}/me`,
      {
        headers: {
	        Authorization: `Bearer ${token}`,
        },
      }
    ).pipe(
      tap(user => this._currentUser.set(user))
    );
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('currentUser');
  }

  updateUser(updatedUser: User): Observable<User> {
    const token = localStorage.getItem(this.tokenKey);

    return this.http.put<User>(
      `${this.apiUrl}/me`,
      { name: updatedUser.name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).pipe(
      tap(user => {
        this._currentUser.set(user);

        this._users.update(users =>
          users.map(existingUser =>
            existingUser.id === user.id ? user : existingUser
          )
        );
      })
    );
  }

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<{ message: string }> {
   const token = localStorage.getItem(this.tokenKey);

   return this.http.put<{ message: string }>(
      `${this.apiUrl}/me/password`,
      {
        current_password: currentPassword,
        new_password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem(this.tokenKey);

    if (!token) {
      return;
    }

    this.getCurrentUser().subscribe({
      error: () => this.logout(),
    });
  }
}
