import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Observable, Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Message, MessagesFilters } from '../../interfaces/wires.interface';
import { WiresService } from '../../services/wires.service';

@Component({
  selector: 'app-search-my-messages-form',
  templateUrl: './search-my-messages-form.component.html',
  styleUrls: ['./search-my-messages-form.component.css'],
})
export class SearchMyMessagesFormComponent implements OnInit, OnDestroy {
  @Output()
  public onSubmit: EventEmitter<Message[]> = new EventEmitter();

  public userId!: string;

  public subscriptions: Subscription[] = [];

  public form = this.fb.group({ date: [''] });

  public constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private wiresService: WiresService
  ) {
    const subscription = this.authService.auth$.subscribe(
      (auth) => (this.userId = auth!.userId)
    );

    this.subscriptions.push(subscription);
  }

  public ngOnInit(): void {
    this.date.valueChanges
      .pipe(switchMap((date) => this.submit({ date, userId: this.userId })))
      .subscribe((messages) => this.onSubmit.next(messages));
  }

  public get date() {
    return this.form.controls.date;
  }

  private submit(filters: MessagesFilters): Observable<Message[]> {
    return this.wiresService.getFilteredMessages(filters);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
