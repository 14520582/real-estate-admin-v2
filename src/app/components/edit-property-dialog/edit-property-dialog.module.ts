import  {NgModule} from '@angular/core';
import {  MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { SharedModule } from "../../ui-core/shared.module";
import { EditPropertyComponent } from "./edit-property-dialog.component";


@NgModule({
  declarations: [
    EditPropertyComponent
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  entryComponents: [EditPropertyComponent],
  exports: [
    EditPropertyComponent
  ]
})
export class PostPageModule {
}
