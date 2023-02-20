import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { PrimeNgImportsModule } from '../prime-ng-imports/prime-ng-imports.module';

@NgModule({
  declarations: [SignInPageComponent, SignUpPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgImportsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
