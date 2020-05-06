import { TestBed } from '@angular/core/testing';

import { User.ApiService } from './user.api.service';

describe('User.ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: User.ApiService = TestBed.get(User.ApiService);
    expect(service).toBeTruthy();
  });
});
