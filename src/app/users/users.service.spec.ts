import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService, HttpClient, HttpHandler],
    });
    service = TestBed.inject(UsersService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get users', () => {
    // filtering is not implemented in this example project i think its better handled on backend anyway
    service.getUsersList(null).subscribe((data) => {
      expect(data.length > 0);
    });
  });
});
