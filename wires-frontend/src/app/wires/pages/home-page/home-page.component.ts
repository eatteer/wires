import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent {
  public messages: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
