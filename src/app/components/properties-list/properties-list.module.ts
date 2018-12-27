import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule, MatListModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatPaginatorModule} from '@angular/material';
import {SharedModule} from "../../ui-core/shared.module";
import { PropertiesListComponent } from "./properties-list.component";
import { PropertiesGridComponent } from "./properties-grid/properties-grid.component";
import { FilterBarModule } from '../../shared/filter-bar/filter-bar.module';
import { AgmCoreModule } from '@agm/core';
import { PropertyCardModule } from '../../shared/property-card/property-card.module';

const routes: Routes = [
  {
    path: '',
    component: PropertiesListComponent,
  }
];

@NgModule({
  declarations: [
    PropertiesListComponent,
    PropertiesGridComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAEsnYcvd5qpf96b0sijRH1FC_n7B_PDXY'
    }),
    SharedModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    PropertyCardModule,
    MatSelectModule,
    FilterBarModule
  ],
  providers: [],
})
export class PropertiesListModule {
}

