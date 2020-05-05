import { TestBed } from '@angular/core/testing';

import { Auth.ApiService } from './auth.api.service';

describe('Auth.ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Auth.ApiService = TestBed.get(Auth.ApiService);
    expect(service).toBeTruthy();
  });
});
