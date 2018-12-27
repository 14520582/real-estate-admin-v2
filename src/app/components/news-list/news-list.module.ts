import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from "../../ui-core/shared.module";
import { NewsListComponent } from "./news-list.component";
import { MatButtonModule } from '@angular/material';
import { NewsCardModule } from '../../shared/news-card/news-card.module';


const routes: Routes = [
  {
    path: ':category',
    component: NewsListComponent,
  }
];

@NgModule({
  declarations: [
    NewsListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    NewsCardModule
  ],
  providers: [],
  exports: [
    NewsListComponent
  ]
})
export class NewsListModule {
}
