import {
  Spectator,
  createComponentFactory,
  byRole,
  byTestId,
  byText
} from '@ngneat/spectator/jest';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { AppNavComponent, AppNavComponentModule } from './app-nav.component';
import exp = require('constants');

describe('AppNavComponent', () => {
  const userMenuButtonTestId = 'app-nav-userMenuButton';
  const userNameTestId = 'app-nav-userName';
  const testTitle = 'Test App Title';
  const testUserName = 'Test User Person';

  const getUserMenuButton = (
    spectator: Spectator<AppNavComponent>
  ): Element | null => spectator.query(byTestId(userMenuButtonTestId));

  let spectator: Spectator<AppNavComponent>;

  const createComponent = createComponentFactory({
    component: AppNavComponent,
    imports: [AppNavComponentModule, NoopAnimationsModule],
    declareComponent: false,
  });

  it('creates', () => {
    spectator = createComponent();
    expect(spectator).toBeTruthy();
  });

  it('displays the app title', () => {
    spectator = createComponent({
      props: {
        title: testTitle,
      },
    });

    const heading = spectator.query(byRole('heading', { level: 1 }));

    expect(heading).toExist();
    expect(heading).toHaveText(testTitle);
  });

  it('only displays the user menu when logged in', () => {
    spectator = createComponent({
      props: {
        title: testTitle,
        loggedIn: true,
      },
    });

    expect(getUserMenuButton(spectator)).toExist();

    spectator.setInput({ loggedIn: false });
    spectator.detectChanges();

    expect(getUserMenuButton(spectator)).not.toExist();
  });

  it("displays the user's name in the menu", () => {
    spectator = createComponent({
      props: {
        title: testTitle,
        loggedIn: true,
        username: testUserName,
      },
    });

    expect(getUserMenuButton(spectator)).toExist();
    expect(spectator.query(byTestId(userNameTestId))).not.toExist();

    spectator.click(byTestId(userMenuButtonTestId));
    spectator.detectChanges();

    const userNameMenuItem = spectator.query(byTestId(userNameTestId));
    expect(userNameMenuItem).toExist();
    expect(userNameMenuItem).toContainText(testUserName);
  });
});
