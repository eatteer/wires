import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccessTokenError } from '../errors/access-token.error';
import {
  SignInCredentials,
  Auth,
  SignUpCredentials,
  User,
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ACCESS_TOKEN_KEY = 'access_token';

  private authSubject$ = new BehaviorSubject<Auth | undefined>(undefined);
  public auth$ = this.authSubject$.asObservable();

  public constructor(private httpClient: HttpClient, private router: Router) {}

  public signIn(credentials: SignInCredentials): Observable<Auth> {
    const endpoint = `${environment.API_BASE_URL}/auth/signin`;
    return this.httpClient.post<Auth>(endpoint, credentials).pipe(
      tap((auth) => {
        // Save access token in local storage
        // and update auth state.
        this.saveAccessToken(auth);
        this.authSubject$.next(auth);
      })
    );
  }

  public signUp(credentials: SignUpCredentials): Observable<User> {
    const endpoint = `${environment.API_BASE_URL}/auth/signup`;
    return this.httpClient.post<User>(endpoint, credentials);
  }

  public logout(): void {
    this.removeAccessToken();
    this.router.navigate(['/auth/sign-in']);
  }

  /**
   * Send access token to API for refreshing.
   */
  public refresh(): Observable<Auth> {
    const observable$ = new Observable<Auth>((subscriber) => {
      let token;
      try {
        // Read access token from local storage.
        token = this.getAccessToken();
      } catch (error) {
        console.error(error);
        throw error;
      }
      // Send token to API.
      const endpoint = `${environment.API_BASE_URL}/auth/refresh`;
      const authorization = `Bearer ${token}`;
      const headers = new HttpHeaders().set('Authorization', authorization);
      this.httpClient.get<Auth>(endpoint, { headers }).subscribe({
        next: (value) => {
          subscriber.next(value);
        },
        error: (error) => {
          subscriber.error(error);
        },
        complete: () => {
          subscriber.complete();
        },
      });
    });
    return observable$;
  }

  private saveAccessToken(auth: Auth): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, auth.access_token);
  }

  private removeAccessToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Try to get access token from local storage.
   * If does not exist throw an error.
   */
  private getAccessToken(): string {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    if (!token) throw new AccessTokenError('NONEXISTENT_ACCESS_TOKEN');
    return token;
  }
}
