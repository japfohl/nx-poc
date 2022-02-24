import {
  Spectator,
  createComponentFactory,
  byRole,
  byTestId,
} from '@ngneat/spectator/jest';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AppNavComponent, AppNavComponentModule } from './app-nav.component';
import { MatMenuHarness } from '@angular/material/menu/testing';

describe('AppNavComponent', () => {
  // constants
  const userMenuButtonTestId = 'app-nav-userMenuButton';
  const signOutButtonTestId = 'app-nav-signOutButton';
  const signInButtonTestId = 'app-nav-signInButton';
  const testTitle = 'Test App Title';
  const testUserName = 'Test User Person';

  // test helpers
  const getUserMenuButton = (
    spectator: Spectator<AppNavComponent>
  ): Element | null => spectator.query(byTestId(userMenuButtonTestId));

  let spectator: Spectator<AppNavComponent>;
  let loader: HarnessLoader;

  const createComponent = createComponentFactory({
    component: AppNavComponent,
    imports: [AppNavComponentModule, NoopAnimationsModule],
    declareComponent: false,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        title: testTitle,
        loggedIn: true,
        username: testUserName,
      },
    });

    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
  });

  it('creates', () => {
    expect(spectator).toBeTruthy();
  });

  it('displays the app title', () => {
    const heading = spectator.query(byRole('heading', { level: 1 }));

    expect(heading).toExist();
    expect(heading).toHaveText(testTitle);
  });

  it('only displays the user menu when logged in', () => {
    expect(getUserMenuButton(spectator)).toExist();

    spectator.setInput({ loggedIn: false });
    spectator.detectChanges();

    expect(getUserMenuButton(spectator)).not.toExist();
  });

  it('allows the user to sign in when not logged in', () => {
    let signin = false;
    spectator.output('signin').subscribe(() => (signin = true));

    expect(spectator.query(byTestId(signInButtonTestId))).not.toExist();
    spectator.setInput({ loggedIn: false });
    spectator.detectChanges();
    expect(spectator.query(byTestId(signInButtonTestId))).toExist();

    spectator.click(byTestId(signInButtonTestId));
    spectator.detectChanges();
    expect(signin).toBe(true);
  });

  it("displays the user's name in the menu", async () => {
    const menuHarness = await loader.getHarness(MatMenuHarness);
    expect(await menuHarness.isOpen()).toBe(false);

    spectator.click(byTestId(userMenuButtonTestId));
    expect(await menuHarness.isOpen()).toBe(true);

    const nameMenuItems = await menuHarness.getItems({ text: testUserName });
    expect(nameMenuItems.length).toEqual(1);

    const nameItem = nameMenuItems[0];
    expect(await nameItem.isDisabled()).toBe(true);
    expect(await nameItem.getText()).toBe(testUserName);
  });

  it('emits a logout event when clicking the logout menu option', async () => {
    let signOut = false;
    spectator.output('signout').subscribe(() => (signOut = true));

    const menuHarness = await loader.getHarness(MatMenuHarness);
    await menuHarness.clickItem({
      selector: `[data-testid="${signOutButtonTestId}"]`,
    });

    expect(signOut).toBe(true);
  });
});
