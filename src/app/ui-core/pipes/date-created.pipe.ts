import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateCreated'
})
export class DateCreatedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    moment.locale("vi")
    let temp : string = moment(value).format('dddd, DD/MM/YYYY | HH:mm');
    return temp.charAt(0).toUpperCase() + temp.slice(1);
  }

}
