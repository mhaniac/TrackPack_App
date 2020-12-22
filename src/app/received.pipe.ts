import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'received'
})
export class ReceivedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
