import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'direction'
})
export class DirectionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 1:
        return 'Đông'
      case 2:
        return 'Tây'
      case 3:
        return 'Nam'
      case 4:
        return 'Bắc'
      case 13:
        return 'Đông Nam'
      case 14:
        return 'Đông Bắc'
      case 23:
        return 'Tây Nam'
      case 24:
        return 'Tây Bắc'
      default:
        return '--'
    }
  }

}
