import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styles: [],
})
export class SignUpPageComponent {
  public form = this.fb.group({
    username: ['', [Validators.required]],
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  public submit(): void {
    const { username, fullname, email, password } = this.form.getRawValue();
    this.authService.signUp({ username, fullname, email, password }).subscribe({
      next: (_) => {
        alert('User registered');
        this.router.navigate(['/auth/sign-in']);
      },
      error: (httpErrorResponse: any) => {
        // User could not be signed up.
        alert(httpErrorResponse.error.message);
      },
    });
  }
}
