import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UsersService } from '../users.service';
import {
  UserActionTypes,
  GetUserSuccess,
  GetUserFailure,
  GetUser,
} from './users.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  @Effect()
  getUsersAsync$ = this.actions$.pipe(
    ofType<GetUser>(UserActionTypes.GetUser),
    switchMap((action) =>
      this.usersService.getUsersList(action.payload).pipe(
        map((users) => new GetUserSuccess(users)),
        catchError((er) => of(new GetUserFailure(er)))
      )
    )
  );
}
