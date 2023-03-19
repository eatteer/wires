import {
  Component,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { WiresService } from '../../services/wires.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class CreateMessageComponent implements AfterViewInit {
  @ViewChild('modalToggle')
  public modalCheckboxRef!: ElementRef<HTMLInputElement>;

  public regex: RegExp = /^(\w|\s)+$/;

  public form = this.fb.group({
    title: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  public constructor(
    private fb: NonNullableFormBuilder,
    private wiresService: WiresService
  ) {}

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

  public submit(): void {
    const { title, message } = this.form.getRawValue();
    this.wiresService.createMessage({ title, text: message }).subscribe((_) => {
      alert('Message created');
      this.wiresService.notifyMessageCreation();
      this.clearControls();
      this.closeModal();
    });
  }

  private closeModal(): void {
    const checkbox = this.modalCheckboxRef.nativeElement;
    const checked = checkbox.checked;
    checkbox.checked = !checked;
  }
}
