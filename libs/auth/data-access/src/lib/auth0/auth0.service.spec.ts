import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { Auth0Service } from './auth0.service';

describe('Auth0Service', () => {
  let spectator: SpectatorService<Auth0Service>;
  const createService = createServiceFactory(Auth0Service);

  beforeEach(() => spectator = createService());

  it('should...', () => {
    expect(spectator.service).toBeTruthy();
  });
});