import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInCredentials, Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject$ = new BehaviorSubject<Auth | undefined>(undefined);

  public auth$ = this.authSubject$.asObservable();

  public constructor(private httpClient: HttpClient, private router: Router) {}

  public signIn(credentials: SignInCredentials): Observable<Auth> {
    const endpoint = `${environment.API_BASE_URL}/auth/signin`;
    return this.httpClient.post<Auth>(endpoint, credentials).pipe(
      tap((auth) => {
        // Save authentication information in local storage
        // and update auth state
        this.saveAuthInLocalStorage(auth);
        this.authSubject$.next(auth);
      })
    );
  }

  public logout(): void {
    this.removeAuthFromLocalStorage();
    this.router.navigate(['/auth/sign-in']);
  }

  private saveAuthInLocalStorage(auth: Auth): void {
    localStorage.setItem('access_token', auth.access_token);
  }

  private removeAuthFromLocalStorage(): void {
    localStorage.removeItem('access_token');
  }
}
