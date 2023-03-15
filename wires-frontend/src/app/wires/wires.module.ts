import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { WiresRoutingModule } from './wires-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from '../shared/shared.module';
import { WiresPageComponent } from './pages/wires-page/wires-page.component';
import { MyMessagesPageComponent } from './pages/my-messages-page/my-messages-page.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    HomePageComponent,
    WiresPageComponent,
    MyMessagesPageComponent,
    CreateMessageComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    WiresRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class WiresModule {}
