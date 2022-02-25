import { InjectionToken } from "@angular/core";

export interface AuthConfig {
  clientId: string;
  authority: string;
  redirectUri?: string;
}

export const AUTH_CONFIG = new InjectionToken<AuthConfig>('Auth Configuration');


export interface User {
  name?: string;
}

export type AuthInteractionType = 'redirect' | 'popup';

export enum AuthProvider {
  Auth0
}
