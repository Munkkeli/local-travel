import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DescriptionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'descriptionPipe'
})
export class DescriptionPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    try {
      const description = JSON.parse(value);
      return description.description || '';
    } catch (e) {
      return '';
    }
  }
}
