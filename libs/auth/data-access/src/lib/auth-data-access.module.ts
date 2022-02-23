import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';
import { Auth0Service } from './auth0/auth0.service';
import { AuthService } from './auth.service';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromAuth.AUTH_FEATURE_KEY, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
    AuthModule.forRoot({
      // TODO: load these from an external config
      clientId: 'yUIJoaXBylp1PxYJESXc53uJ88iMjhsR',
      domain: 'dev-rak43hby.us.auth0.com'
    })
  ],
  providers: [
    AuthFacade,
    {
      provide: AuthService,
      useClass: Auth0Service
    }
  ],
})
export class AuthDataAccessModule {}
