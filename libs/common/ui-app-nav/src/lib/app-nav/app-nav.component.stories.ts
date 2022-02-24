import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { AppNavComponent, AppNavComponentModule } from './app-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'AppNavComponent',
  component: AppNavComponent,
  decorators: [
    moduleMetadata({
      imports: [AppNavComponentModule, BrowserAnimationsModule],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta<AppNavComponent>;

export const actionsData = {
  signout: action('signout'),
  signin: action('signin')
};

const Template: Story<AppNavComponent> = (args: AppNavComponent) => ({
  props: {
    ...args,
    signout: actionsData.signout,
    signin: actionsData.signin
  }
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  title: 'Awesome App Title',
  loggedIn: true,
  username: 'Test User',
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...LoggedIn.args,
  loggedIn: false,
};
