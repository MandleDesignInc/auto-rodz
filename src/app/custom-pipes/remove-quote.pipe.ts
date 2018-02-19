import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeQuote'})
export class RemoveQuotePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('"', '');
  }

}
