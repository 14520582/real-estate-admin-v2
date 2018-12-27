import {NgModule} from '@angular/core';
import {MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, MatSelectModule, MatFormFieldModule, MatSliderModule, MatRadioModule} from '@angular/material';
import {SharedModule} from "../../ui-core/shared.module";
import { FilterBarComponent } from "./filter-bar.component";

@NgModule({
  declarations: [
    FilterBarComponent
  ],
  imports: [
    SharedModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSliderModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
  ],
  exports: [FilterBarComponent]
})
export class FilterBarModule {
}

