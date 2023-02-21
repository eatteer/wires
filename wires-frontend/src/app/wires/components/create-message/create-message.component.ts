import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styles: [],
})
export class CreateMessageComponent implements AfterViewInit {
  public regex: RegExp = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;

  public form = this.fb.group({
    title: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  @ViewChild('message')
  public messageReference!: ElementRef<HTMLInputElement>;

  public constructor(private fb: NonNullableFormBuilder) {}

  // TODO: Paint special characters in red
  public ngAfterViewInit(): void {
    this.form.controls.message.valueChanges
      .pipe(
        tap((value) => {
          const textarea = this.messageReference.nativeElement;
          if (value.match(this.regex)) {
            console.log('Special characters were introduced');
            const splitValue = value.split('');
            const specialCharacters = splitValue.filter((value) =>
              value.match(this.regex)
            );
            specialCharacters.forEach((value) => {
              const replaced = textarea.value.replace(value, 'X');
              textarea.value = replaced;
            });
          }
        })
      )
      .subscribe();
  }

  public clearControls(): void {
    this.form.reset();
  }
}
