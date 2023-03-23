import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styles: [],
})
export class DropdownMenuComponent {
  public auth$ = this.authService.auth$;

  public constructor(private authService: AuthService) {}

  public openCreateMessageModal(): void {
    const checkbox = document.getElementById(
      'create-message-modal-checkbox'
    ) as HTMLInputElement;
    checkbox.checked = true;
  }

  public logout(): void {
    this.authService.logout();
  }
}
