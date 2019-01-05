import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from "../../ui-core/shared.module";
import { UserProfileComponent } from "./user-profile.component";
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatIconModule, MatSelectModule, MatCard, MatCardModule, MatSnackBarModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
  }
];

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
  ],
  providers: [],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule {
}
