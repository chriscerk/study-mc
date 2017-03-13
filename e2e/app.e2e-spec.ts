import { StudymcPage } from './app.po';

describe('studymc App', () => {
  let page: StudymcPage;

  beforeEach(() => {
    page = new StudymcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
