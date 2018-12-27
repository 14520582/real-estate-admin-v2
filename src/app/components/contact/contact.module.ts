import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {  MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { SharedModule } from "../../ui-core/shared.module";
import { ContactComponent } from "./contact.component";


const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  }
];

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  exports: [
    ContactComponent
  ]
})
export class ContactModule {
}
