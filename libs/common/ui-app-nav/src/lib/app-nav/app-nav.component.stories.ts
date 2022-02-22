import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AppNavComponent, AppNavComponentModule } from './app-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'AppNavComponent',
  component: AppNavComponent,
  decorators: [
    moduleMetadata({
      imports: [AppNavComponentModule, BrowserAnimationsModule],
    })
  ],
} as Meta<AppNavComponent>;

const Template: Story<AppNavComponent> = (args: AppNavComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  title: 'Awesome App Title',
  loggedIn: true,
  username: 'Test User'
}
