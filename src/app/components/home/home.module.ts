import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule, MatListModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatButtonModule} from '@angular/material';
import {SharedModule} from "../../ui-core/shared.module";
import { HomeComponent } from "./home.component";
import { CarouselModule } from '../../shared/carousel/carousel.module';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // resolve  : {
    //     data: DesktopsService
    // }
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    CarouselModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}

