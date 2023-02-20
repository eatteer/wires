import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [SignInPageComponent, SignUpPageComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
