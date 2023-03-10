import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class CreateMessageComponent implements AfterViewInit {
  public regex: RegExp = /^(\w|\s)+$/;

  public form = this.fb.group({
    title: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  public constructor(private fb: NonNullableFormBuilder) {}

  // TODO: Paint special characters in red
  public ngAfterViewInit(): void {
    this.form.controls.message.valueChanges
      .pipe(
        tap((value) => {
          if (!value.match(this.regex)) {
            const unmatched = value.replace(/(\w|\s)+/, '');
            console.log('Special characters were introduced');
            console.log(unmatched);
          }
        })
      )
      .subscribe();
  }

  public clearControls(): void {
    this.form.reset();
  }
}
