import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

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

  public constructor(private fb: NonNullableFormBuilder) {}
}
