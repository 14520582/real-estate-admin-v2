import {NgModule} from '@angular/core';
import {MatCardModule, MatButtonModule, MatIconModule} from '@angular/material';
import {SharedModule} from "../../ui-core/shared.module";
import { CarouselComponent } from "./carousel.component";
import { PropertyCardModule } from "../property-card/property-card.module";


@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PropertyCardModule
  ],
  providers: [],
  exports: [CarouselComponent]
})
export class CarouselModule {
}

