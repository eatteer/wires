import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styles: [],
})
export class DropdownMenuComponent {
  public openCreateMessageModal(): void {
    const checkbox = document.getElementById(
      'create-message-modal-checkbox'
    ) as HTMLInputElement;
    checkbox.checked = true;
  }
}
