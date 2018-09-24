import { Pipe, PipeTransform } from '@angular/core';

/** Class representing a FilterPipe. */
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Filter candidates by screen.
   * @param {any} candidates - Array of candidates.
   * @param {string} term - Screen name.
   */
  transform(candidates: any[], term: string): any[] {

    if (!term) {
      return candidates;
    }

    term = term.toLowerCase();

    return candidates.filter(
      c => c.screen_name.toLowerCase().includes(term));
  }

}
