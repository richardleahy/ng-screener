import { ScreensModule } from './screens.module';

describe('ScreensModule', () => {
  let screensModule: ScreensModule;

  beforeEach(() => {
    screensModule = new ScreensModule();
  });

  it('should create an instance', () => {
    expect(screensModule).toBeTruthy();
  });
});
