import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'range'})
export class RangePipe implements PipeTransform {
  transform(value: Array<any>, range: Number): Array<Number> {
    value = [];
    for(var i = 0; i < range; i++){
      value.push(i);
    }
    return value;
  }
}