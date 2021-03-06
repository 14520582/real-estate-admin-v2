import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  MatCardModule,
  MatListModule,
  MatSelectModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import {SharedModule} from "../../ui-core/shared.module";
import { ManagerPropertyComponent } from "./manager-property.component";
import { CarouselModule } from '../../shared/carousel/carousel.module';
import { FilterBarModule } from '../../shared/filter-bar/filter-bar.module';
import { PropertyCardModule } from '../../shared/property-card/property-card.module';
import { EditPropertyModule } from '../edit-property-dialog/edit-property-dialog.module';


const routes: Routes = [
  {
    path: '',
    component: ManagerPropertyComponent,
    // resolve  : {
    //     data: DesktopsService
    // }
  }
];

@NgModule({
  declarations: [
    ManagerPropertyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    EditPropertyModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FilterBarModule,
    PropertyCardModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [],
  exports: [
    ManagerPropertyComponent
  ]
})
export class ManagerPropertyModule {
}

