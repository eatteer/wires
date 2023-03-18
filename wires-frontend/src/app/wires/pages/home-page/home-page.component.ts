import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../../interfaces/wires.interface';
import { WiresService } from '../../services/wires.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent implements OnInit, OnDestroy {
  public messages: Message[] = [];
  private subscriptions: Subscription[] = [];

  public constructor(private wiresService: WiresService) {}

  public ngOnInit(): void {
    this.getAllMessages();

    const subscription = this.wiresService.messageCreation$.subscribe((_) => {
      this.getAllMessages();
    });

    this.subscriptions.push(subscription);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private getAllMessages(): void {
    this.wiresService.getAllMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
