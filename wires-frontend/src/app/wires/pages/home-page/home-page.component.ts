import { Component, OnInit } from '@angular/core';
import { Message } from '../../interfaces/wires.interface';
import { WiresService } from '../../service/wires.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent implements OnInit {
  public messages: Message[] = [];

  public constructor(private wiresService: WiresService) {}

  public ngOnInit(): void {
    this.wiresService.getAllMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
