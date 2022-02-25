import { Injectable } from '@angular/core';
import { AuthService, User as Auth0User } from '@auth0/auth0-angular';
import { map } from 'rxjs';
import { AuthService as AuthServiceBase } from '../authServiceBase';
import { AuthInteractionType, User } from '../models';
import { Maybe, Possibly } from '@nx-poc/util-types';

@Injectable()
export class Auth0Service extends AuthServiceBase {

  constructor(private readonly auth0service: AuthService) {
    super();

    // map from service to super types
    super._isAuthenticated$ = this.auth0service.isAuthenticated$;
    super._isLoading$ = this.auth0service.isLoading$;
    super._error$ = this.auth0service.error$;
    super._user$ = this.auth0service.user$.pipe(map(this.mapAuth0UserToDomainUser));
  }

  login(interactionType: AuthInteractionType): void {
    throw new Error('Method not implemented.');
  }
  logout(interactionType: AuthInteractionType): void {
    throw new Error('Method not implemented.');
  }

  private mapAuth0UserToDomainUser(user: Maybe<Auth0User>): Possibly<User> {
    if (user) return ({
      name: user.name
    } as User)

    return undefined;
  }
}
