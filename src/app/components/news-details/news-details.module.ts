import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from "../../ui-core/shared.module";
import { NewsDetailsComponent } from "./news-details.component";
import { MatFormFieldModule, MatInput, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: NewsDetailsComponent,
  }
];

@NgModule({
  declarations: [
    NewsDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [],
  exports: [
    NewsDetailsComponent
  ]
})
export class NewsDetailsModule {
}
