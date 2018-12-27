import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {  MatIconModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from "../../ui-core/shared.module";
import { AboutComponent } from "./about.component";


const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
  }
];

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatIconModule
  ],
  providers: [],
  exports: [
    AboutComponent
  ]
})
export class AboutModule {
}
