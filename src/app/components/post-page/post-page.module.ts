import  {NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {  MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule, MatSelectModule, MatCheckboxModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from "../../ui-core/shared.module";
import { PostPageComponent } from "./post-page.component";


const routes: Routes = [
  {
    path: '',
    component: PostPageComponent,
  }
];

@NgModule({
  declarations: [
    PostPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  exports: [
    PostPageComponent
  ]
})
export class PostPageModule {
}
