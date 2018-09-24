import { MiscModule } from './misc.module';

describe('MiscModule', () => {
  let miscModule: MiscModule;

  beforeEach(() => {
    miscModule = new MiscModule();
  });

  it('should create an instance', () => {
    expect(miscModule).toBeTruthy();
  });
});
