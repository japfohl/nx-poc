import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { Auth0Module } from './auth0/auth0.module';
import { AuthConfig, AuthProvider, AUTH_CONFIG } from './models';


@NgModule({})
export class AuthDataAccessModule {
  static forRoot(provider: AuthProvider, config: AuthConfig): ModuleWithProviders<unknown> {
    return {
      ngModule: AuthDataAccessModule.getAuthProviderModule(provider),
      providers: [
        {
          provide: AUTH_CONFIG,
          useValue: config
        }
      ]
    }
  }

  private static getAuthProviderModule(provider: AuthProvider): Type<unknown> {
    switch (provider) {
      case AuthProvider.Auth0:
        return Auth0Module;
      default:
        return Auth0Module;
    }
  }
}
