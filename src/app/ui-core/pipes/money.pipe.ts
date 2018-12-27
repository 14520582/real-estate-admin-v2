import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let result = '';
    let b = Math.floor(value/1000000)
    let m = Math.floor((value % 1000000) / 1000)
    let t = (value % 1000000) % 1000
    if (b !== 0)
      result += b + ' tỷ '
    if (m !== 0)
      result += m + ' triệu '
    if (t !== 0)
      result += t + ' nghìn'
    return result;
  }

}
