import { Observable } from "rxjs";
import { AuthEntity } from "./+state/auth.models";

export abstract class AuthService {
  abstract isAuthenticated$: Observable<boolean>
  abstract user$: Observable<AuthEntity>;
  // TODO: figure out shape of this object
  abstract idTokenClaims$: Observable<unknown>;
  abstract authError$: Observable<string>;

  abstract loginWithRedirect(): void;
  abstract logoutWithRedirect(): void;
  abstract loginWithPopup(): void;
  abstract logoutWithPopup(): void;
}
