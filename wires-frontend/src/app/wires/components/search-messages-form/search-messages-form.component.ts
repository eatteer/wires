import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  skip,
  startWith,
  switchMap,
} from 'rxjs';
import { Message, MessagesFilters } from '../../interfaces/wires.interface';
import { WiresService } from '../../services/wires.service';

@Component({
  selector: 'app-search-messages-form',
  templateUrl: './search-messages-form.component.html',
  styleUrls: ['./search-messages-form.component.css'],
})
export class SearchMessagesFormComponent implements OnInit {
  @Output()
  public onSubmit: EventEmitter<Message[]> = new EventEmitter();

  public form = this.fb.group({
    search: [''],
    date: [''],
  });

  public constructor(
    private fb: NonNullableFormBuilder,
    private wiresService: WiresService
  ) {}

  public ngOnInit(): void {
    this.requestMessagesOnControlsChanges().subscribe((messages) => {
      this.onSubmit.emit(messages);
    });
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
   *  - onChangeSearch$
   *  - onChangeDate$
   *
   * to emit an empty string since at some point in the future the user can
   * fill just one control, and since the mentioned observables have emittited
   * at least the empty string, the combineLatest observable can emit for example:
   *
   * ['lemillion´, '']
   * ['', '2023/03/23']
   */
  private requestMessagesOnControlsChanges(): Observable<Message[]> {
    const onChangeSearch$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500)
    );
    const onChangeDate$ = this.dateControl.valueChanges.pipe(startWith(''));

    return combineLatest([onChangeSearch$, onChangeDate$]).pipe(
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
    console.log('REQUESTING');
    return this.wiresService.getFilteredMessages(filters);
  }
}
