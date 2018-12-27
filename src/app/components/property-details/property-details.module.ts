import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule, MatListModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCheckboxModule, MatButtonModule} from '@angular/material';
import {SharedModule} from "../../ui-core/shared.module";
import { PropertyDetailsComponent } from "./property-details.component";
import { FilterBarModule } from '../../shared/filter-bar/filter-bar.module';
import { AgmCoreModule } from '@agm/core';


const routes: Routes = [
  {
    path: ':id',
    component: PropertyDetailsComponent,
  }
];

@NgModule({
  declarations: [
    PropertyDetailsComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAEsnYcvd5qpf96b0sijRH1FC_n7B_PDXY'
    }),
    SharedModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    FilterBarModule,
    MatSelectModule
  ],
  providers: [],
})
export class PropertyDetailsModule {
}

