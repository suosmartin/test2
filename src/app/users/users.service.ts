import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsersList(filter) {
    // Todo: filter backenden a komponens helyett:
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
