import { NgModule } from '@angular/core';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { MoneyPipe } from './money.pipe';
import { DateCreatedPipe } from './date-created.pipe';
import { DirectionPipe } from './direction.pipe';
@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        MoneyPipe,
        DirectionPipe,
        DateCreatedPipe,
        CamelCaseToDashPipe
    ],
    imports     : [],
    exports     : [
        KeysPipe,
        GetByIdPipe,
        DirectionPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        MoneyPipe,
        DateCreatedPipe,
        CamelCaseToDashPipe
    ]
})
export class PipesModule
{
}
