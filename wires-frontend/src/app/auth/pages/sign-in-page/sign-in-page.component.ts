import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styles: [],
})
export class SignInPageComponent {
  public form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false, []],
  });

  public constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  public submit(): void {
    // Get values from form
    const { username, password } = this.form.getRawValue();
    // Try to authenticate user using the given credentials
    this.authService.signIn({ username, password }).subscribe({
      next: (_) => {
        // User could be authenticated
        this.router.navigate(['/wires']);
      },
      error: (httpErrorResponse: any) => {
        // User could not be authenticated
        alert(httpErrorResponse.error.message);
      },
    });
  }
}
