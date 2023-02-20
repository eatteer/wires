import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  exports: [ButtonModule, InputTextModule, CardModule, CheckboxModule],
})
export class PrimeNgImportsModule {}
