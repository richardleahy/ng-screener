import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('filters questions by category', () => {
    const pipe = new FilterPipe();
    const term = "cat2";
    const questions = [
      {
        question: "test1",
        categories: [
          {category: "cat1"}
        ]
      },
      {
        question: "test2",
        categories: [
          {category: "cat2"}
        ]
      },  
    ];
    expect(pipe.transform(questions, term).length).toBe(1);
    expect(pipe.transform(questions, term)[0]).toEqual(questions[1]);
  });
});
