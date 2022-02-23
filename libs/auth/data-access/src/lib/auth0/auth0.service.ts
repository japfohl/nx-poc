import { Injectable } from '@angular/core';
import { NEVER, Observable } from 'rxjs';
import { AuthEntity } from '../+state/auth.models';
import { AuthService } from '../auth.service';

@Injectable()
export class Auth0Service extends AuthService {
  isAuthenticated$: Observable<boolean> = NEVER;
  user$: Observable<AuthEntity> = NEVER;
  idTokenClaims$: Observable<unknown> = NEVER;
  authError$: Observable<string> = NEVER;

  loginWithRedirect(): void {
    // TODO: implement me
    console.log('loginWithRedirect called');
  }

  logoutWithRedirect(): void {
    // TODO: implement me
    console.log('logoutWithRedirect called');
  }

  loginWithPopup(): void {
    // TODO: implement me
    console.log('loginWithPopup called');
  }

  logoutWithPopup(): void {
    // TODO: implement me
    console.log('logoutWithPopup called');
  }
}
