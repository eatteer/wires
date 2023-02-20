import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { WiresPageComponent } from './pages/wires-page/wires-page.component';
import { MyMessagesPageComponent } from './pages/my-messages-page/my-messages-page.component';

const routes: Routes = [
  {
    path: '',
    component: WiresPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'my-messages', component: MyMessagesPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WiresRoutingModule {}
