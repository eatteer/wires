import { Component } from '@angular/core';
import { SessionMessageService } from 'src/app/wires/services/session-message.service';

@Component({
  selector: 'app-dropdown-recent-messages',
  templateUrl: './dropdown-recent-messages.component.html',
  styles: [],
})
export class DropdownRecentMessagesComponent {
  public messages$ = this.sessionMessagesServices.messages$;
  public messagesCount$ = this.sessionMessagesServices.messagesCount$;

  public constructor(private sessionMessagesServices: SessionMessageService) {}
}
