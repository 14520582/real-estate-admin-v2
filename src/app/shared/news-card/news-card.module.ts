import {NgModule} from '@angular/core';
import {MatCardModule, MatIconModule} from '@angular/material';
import {SharedModule} from "../../ui-core/shared.module";
import { NewsCardComponent } from "./news-card.component";

@NgModule({
  declarations: [
    NewsCardComponent
  ],
  imports: [
    SharedModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  exports: [NewsCardComponent]
})
export class NewsCardModule {
}

