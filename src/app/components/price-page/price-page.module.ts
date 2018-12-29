import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from "../../ui-core/shared.module";
import { PricePageComponent } from "./price-page.component";
import { MatFormFieldModule, MatInput, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: PricePageComponent,
  }
];

@NgModule({
  declarations: [
    PricePageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [
    PricePageComponent
  ]
})
export class PricePageModule {
}
