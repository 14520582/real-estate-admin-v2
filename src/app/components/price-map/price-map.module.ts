import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from "../../ui-core/shared.module";
import { PriceMapComponent } from "./price-map.component";
import { DxVectorMapModule } from 'devextreme-angular';

const routes: Routes = [
  {
    path: '',
    component: PriceMapComponent,
  }
];

@NgModule({
  declarations: [
    PriceMapComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    DxVectorMapModule
  ],
  providers: [],
})
export class PriceMapModule {
}

