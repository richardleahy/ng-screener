import { Pipe, PipeTransform } from '@angular/core';

/**
 * Class representing a FilterPipe.
 */
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Filter questions by category.
   * @param {Array} questions - Questions to filter.
   * @param {string} term - Category to filter by. 
   */
  transform(questions: any[], term: string): any[] {

    if (!term) {
      return questions;
    }

    term = term.toLowerCase();

    return questions.filter(q => {
      for (let v of q.categories) {
        return v.category.toLowerCase().includes(term);
      }
    });
  }

}
