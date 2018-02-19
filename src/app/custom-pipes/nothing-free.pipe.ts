import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nothingFree'
})
export class NothingFreePipe implements PipeTransform {

  transform(value: string): string {

    if (+value === 0) {
      value = 'Please call for price';
    }

    return value;
  }

}
