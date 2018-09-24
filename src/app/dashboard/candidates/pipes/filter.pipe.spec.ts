import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('filters candidates by term', () => {
    const pipe = new FilterPipe();
    const term = "test2";
    const candidates = [
      {
        first_name: "test1",
        screen_name: "test1"
      },
      {
        first_name: "test2",
        screen_name: "test2"
      },   
    ];
    expect(pipe.transform(candidates, term).length).toBe(1);
    expect(pipe.transform(candidates, term)[0]).toEqual(candidates[1]);
  });
});
