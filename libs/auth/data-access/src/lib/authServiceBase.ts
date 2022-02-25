import { Possibly } from "@nx-poc/util-types";
import { NEVER, Observable, of } from "rxjs";
import { AuthInteractionType, User } from "./models";

/*
TODOS:
- allow additional configuration information to be passed to the login / logout methods
*/

export abstract class AuthService {
  // class properties
  protected _isAuthenticated$: Observable<boolean> = of(false);
  protected _isLoading$: Observable<boolean> = of(false);
  protected _user$: Observable<Possibly<User>> = NEVER;
  protected _error$: Observable<Possibly<Error>> = NEVER;

  // methods
  abstract login(interactionType: AuthInteractionType): void;
  abstract logout(interactionType: AuthInteractionType): void;

  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$;
  }

  get isLoading$(): Observable<boolean> {
    return this._isLoading$;
  }

  get user$(): Observable<Possibly<User>> {
    return this._user$;
  }

  get error$(): Observable<Possibly<Error>> {
    return this._error$;
  }
}
