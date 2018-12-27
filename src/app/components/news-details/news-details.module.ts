import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from "../../ui-core/shared.module";
import { NewsDetailsComponent } from "./news-details.component";


const routes: Routes = [
  {
    path: ':id',
    component: NewsDetailsComponent,
  }
];

@NgModule({
  declarations: [
    NewsDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [],
  exports: [
    NewsDetailsComponent
  ]
})
export class NewsDetailsModule {
}
