import { ClassicminidiyPage } from './app.po';

describe('classicminidiy App', function() {
  let page: ClassicminidiyPage;

  beforeEach(() => {
    page = new ClassicminidiyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
