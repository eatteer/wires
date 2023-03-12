import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanMatch {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.refresh().pipe(
      map((_) => true),
      catchError((_) => {
        this.router.navigate(['/auth/sign-in']);
        return of(false);
      })
    );
  }
}
