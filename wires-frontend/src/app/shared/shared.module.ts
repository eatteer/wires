import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DropdownRecentMessagesComponent } from './components/dropdown-recent-messages/dropdown-recent-messages.component';

@NgModule({
  declarations: [
    NavbarComponent,
    DropdownMenuComponent,
    DropdownRecentMessagesComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
