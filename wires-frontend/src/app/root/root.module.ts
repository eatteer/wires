import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootPageComponent } from './pages/root-page/root-page.component';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  declarations: [RootPageComponent],
  imports: [CommonModule, RootRoutingModule],
})
export class RootModule {}
