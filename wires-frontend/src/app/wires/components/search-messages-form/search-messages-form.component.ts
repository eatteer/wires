import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  skip,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { Message, MessagesFilters } from '../../interfaces/wires.interface';
import { WiresService } from '../../services/wires.service';

@Component({
  selector: 'app-search-messages-form',
  templateUrl: './search-messages-form.component.html',
  styles: [],
})
export class SearchMessagesFormComponent implements OnInit {
  @Output()
  public onSubmit: EventEmitter<Message[]> = new EventEmitter();

  public subscriptions: Subscription[] = [];

  public form = this.fb.group({
    search: [''],
    date: [''],
  });

  public constructor(
    private fb: NonNullableFormBuilder,
    private wiresService: WiresService
  ) {}

  public ngOnInit(): void {
    const subscription = this.getFilteredMessagesOnControlsChanges().subscribe(
      (messages) => {
        this.onSubmit.emit(messages);
      }
    );
    this.subscriptions.push(subscription);
  }

  public get searchControl() {
    return this.form.controls.search;
  }

  public get dateControl() {
    return this.form.controls.date;
  }

  /**
   * Combine the latest values emitted by search and date valueChanges observables.
   *
   * Initialize the combineLatest observables
   *  - onSearchChanges$
   *  - onDateChanges$
   *
   * to emit an empty string since at some point in the future the user can
   * fill just one control, and since the mentioned observables have emittited
   * at least the empty string, the combineLatest observable can emit for example:
   *
   * ['lemillion´, '']
   * ['', '2023/03/23']
   */
  private getFilteredMessagesOnControlsChanges(): Observable<Message[]> {
    const onSearchChanges$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500)
    );
    const onDateChanges$ = this.dateControl.valueChanges.pipe(startWith(''));

    return combineLatest([onSearchChanges$, onDateChanges$]).pipe(
      /**
       * Skip the first emission = ['', ''],
       * so the home page can fetch the initial messages
       * and form changes can fetch the filtered messages.
       */
      skip(1),
      map(([search, date]) => ({ search, date })),
      switchMap((filters) => this.submit(filters))
    );
  }

  public submit(filters: MessagesFilters): Observable<Message[]> {
    return this.wiresService.getFilteredMessages(filters);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
