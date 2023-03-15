import { Component, OnInit } from '@angular/core';
import { Message } from '../../interfaces/wires.interface';
import { WiresService } from '../../service/wires.service';

@Component({
  selector: 'app-my-messages-page',
  templateUrl: './my-messages-page.component.html',
  styles: [],
})
export class MyMessagesPageComponent implements OnInit {
  public messages: Message[] = [];

  public constructor(private wiresService: WiresService) {}

  public ngOnInit(): void {
    this.wiresService.getMyMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
