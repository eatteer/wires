import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { combineLatest, debounceTime, map, Observable, switchMap } from 'rxjs';
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
    const onChangeSearch$ = this.searchControl.valueChanges.pipe(
      debounceTime(500)
    );
    const onChangeDate$ = this.dateControl.valueChanges;
    combineLatest([onChangeSearch$, onChangeDate$])
      .pipe(
        map(([search, date]) => ({ search, date })),
        switchMap((filters) => this.submit(filters))
      )
      .subscribe((messages) => this.onSubmit.emit(messages));
  }

  public submit(filters: MessagesFilters): Observable<Message[]> {
    return this.wiresService.getFilteredMessages(filters);
  }

  public get searchControl() {
    return this.form.controls.search;
  }

  public get dateControl() {
    return this.form.controls.date;
  }

  private getFormattedCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
}
