import {NgModule} from '@angular/core';
import {MatCardModule, MatIconModule} from '@angular/material';
import {SharedModule} from "../../ui-core/shared.module";
import { PropertyCardComponent } from "./property-card.component";

@NgModule({
  declarations: [
    PropertyCardComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  exports: [PropertyCardComponent]
})
export class PropertyCardModule {
}

