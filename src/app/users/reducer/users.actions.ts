import { Action } from '@ngrx/store';
import { User, UserFilter } from '../models';

export enum UserActionTypes {
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success',
  GetUserFailure = '[User] Get User Failure',

  AddUser = '[User] Add User',
  AddUserSuccess = '[User] Add User Success', // not used - it can return a message
  AddUserFailure = '[User] Add User Failure', // not used - it can return an error message

  UpdateUser = '[User] Update User',

  DeleteUser = '[User] Delete User',
  DeleteUserSuccess = '[User] Delete User Success', // not used - it can return a  message
  DeleteUserFailure = '[User] Delete User Failure', // not used - it can return an error message

  SelectUser = '[User] Select User',
  ClearUser = '[User] Clear User',
  FilterUser = '[User] Filter User',
}
export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor(public payload: User) {}
}
export class FilterUser implements Action {
  readonly type = UserActionTypes.FilterUser;
  constructor(public payload: UserFilter) {}
}
export class SelectUser implements Action {
  readonly type = UserActionTypes.SelectUser;
  constructor(public payload: { user: User; readonly: boolean }) {}
}
export class ClearUser implements Action {
  readonly type = UserActionTypes.ClearUser;
  constructor() {}
}

export class AddUser implements Action {
  readonly type = UserActionTypes.AddUser;
  constructor(public payload: User) {}
}
export class AddUserSuccess implements Action {
  readonly type = UserActionTypes.AddUserSuccess;
  constructor() {}
}
export class AddUserFailure implements Action {
  readonly type = UserActionTypes.AddUserFailure;
  constructor(public payload: string) {}
}

export class GetUser implements Action {
  readonly type = UserActionTypes.GetUser;
  constructor(public payload: UserFilter) {}
}
export class GetUserSuccess implements Action {
  readonly type = UserActionTypes.GetUserSuccess;
  constructor(public payload: User[]) {}
}
export class GetUserFailure implements Action {
  readonly type = UserActionTypes.GetUserFailure;
  constructor(public payload: any) {}
}

export class DeleteUser implements Action {
  readonly type = UserActionTypes.DeleteUser;

  constructor(public payload: number) {}
}
export class DeleteUserSuccess implements Action {
  readonly type = UserActionTypes.DeleteUserSuccess;
  constructor() {}
}
export class DeleteUserFailure implements Action {
  readonly type = UserActionTypes.DeleteUserFailure;
  constructor(public payload: string) {}
}

export type UserActions =
  | GetUser
  | GetUserSuccess
  | GetUserFailure
  | AddUser
  | AddUserSuccess
  | AddUserFailure
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFailure
  | SelectUser
  | ClearUser
  | FilterUser
  | UpdateUser;
