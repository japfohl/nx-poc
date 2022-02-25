import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, AuthClientConfig, AuthConfig } from '@auth0/auth0-angular';
import { AuthService } from '../authServiceBase';
import { AuthConfig as GenericAuthConfig, AUTH_CONFIG } from '../models';
import { Auth0Service } from './auth0.service';

async function initAuth0Module(
  clientConfig: AuthClientConfig,
  config: GenericAuthConfig
): Promise<void> {
  clientConfig.set({
    clientId: config.clientId,
    domain: config.authority,
    ...(config.redirectUri ? { redirectUri: config.redirectUri } : {}),
  } as AuthConfig);
}

@NgModule({
  imports: [AuthModule.forRoot()],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAuth0Module,
      deps: [AuthClientConfig, AUTH_CONFIG],
      multi: true,
    },
    {
      provide: AuthService,
      useClass: Auth0Service
    }
  ],
})
export class Auth0Module {}
