import { TestBed } from '@angular/core/testing';

import { AuthAlumnsGuard } from './auth-alumns.guard';

describe('AuthAlumnsGuard', () => {
  let guard: AuthAlumnsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAlumnsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
