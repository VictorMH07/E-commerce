import { Injectable, signal } from '@angular/core';

import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly _users = signal<User[]>([]);
  readonly users = this._users.asReadonly();

  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  readonly isLoggedIn = () => this._currentUser() != null;

  constructor() {
    this.loadUsers();
    this.loadCurrentUser();
  }

  register(user: User): boolean {
    const existingUser = this._users().find(existing => existing.email === user.email);
    if (existingUser) {
      return false;
    }
    this._users.update(users => [...users, user]);
    this.saveUsers();
    return true;
  }

  login(email: string, password: string): User | null {
    const user = this._users().find(
      user => user.email === email && user.password === password
    );
    if (!user) {
      return null;
    }

    this._currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('currentUser');
  }

  updateUser(updatedUser: User): void {
    this._currentUser.set(updatedUser);

    const users = this._users().map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );

    this._users.set(users);
    this.saveUsers();
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }  

  private saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(this._users()));
  }

  private loadUsers(): void {
    const storedUsers = localStorage.getItem('users') ?? localStorage.getItem('user');
    if (storedUsers !== null) {
      this._users.set(JSON.parse(storedUsers));
    }
  }

  private loadCurrentUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser != null) {
      this._currentUser.set(JSON.parse(storedUser));
    }
  }
}
