import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../../interfaces/wires.interface';
import { WiresService } from '../../services/wires.service';

@Component({
  selector: 'app-my-messages-page',
  templateUrl: './my-messages-page.component.html',
  styles: [],
})
export class MyMessagesPageComponent implements OnInit, OnDestroy {
  public messages: Message[] = [];
  private subscriptions: Subscription[] = [];

  public constructor(private wiresService: WiresService) {}

  public ngOnInit(): void {
    this.getMyMessages();

    const subscription = this.wiresService.messageCreation$.subscribe((_) => {
      this.getMyMessages();
    });

    this.subscriptions.push(subscription);
  }

  private getMyMessages(): void {
    this.wiresService.getMyMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  public getMessages(messages: Message[]): void {
    this.messages = messages;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
