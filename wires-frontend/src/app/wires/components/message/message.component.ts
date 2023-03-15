import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/wires.interface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styles: [],
})
export class MessageComponent {
  @Input()
  public message!: Message;
}
