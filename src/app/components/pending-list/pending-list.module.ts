import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from "../../ui-core/shared.module";
import { PendingListComponent } from "./pending-list.component";
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatIconModule, MatSelectModule } from '@angular/material';
import { NewsCardModule } from '../../shared/news-card/news-card.module';


const routes: Routes = [
  {
    path: '',
    component: PendingListComponent,
  }
];

@NgModule({
  declarations: [
    PendingListComponent
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
  ],
  providers: [],
  exports: [
    PendingListComponent
  ]
})
export class PendingListModule {
}
