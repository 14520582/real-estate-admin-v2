import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from "../../ui-core/shared.module";
import { NewsManagerComponent } from "./news-manage.component";
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatIconModule, MatSelectModule } from '@angular/material';
import { NewsCardModule } from '../../shared/news-card/news-card.module';


const routes: Routes = [
  {
    path: '',
    component: NewsManagerComponent,
  }
];

@NgModule({
  declarations: [
    NewsManagerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    NewsCardModule
  ],
  providers: [],
  exports: [
    NewsManagerComponent
  ]
})
export class NewsManagerModule {
}
