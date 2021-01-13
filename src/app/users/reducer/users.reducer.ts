import { UserActions, UserActionTypes } from './users.actions';
import { User, UserFilter } from '../models';

export interface UsersState {
  users: User[];
  originalUsers: User[];
  selectedUser?: User;
  editorReadOnly?: boolean;
  userFilter?: UserFilter;
  loaded: boolean;
}
// I felt its not neccesary for this test application to store the filter

export const initialState: UsersState = {
  users: [],
  originalUsers: [],
  selectedUser: null,
  editorReadOnly: null,
  userFilter: {},
  loaded: false,
};

export const reducer = (
  state = initialState,
  action: UserActions
): UsersState => {
  switch (action.type) {
    // Filter is not handled here
    case UserActionTypes.UpdateUser:
      return (state = {
        ...state,
        originalUsers: state.originalUsers
          .filter((user) => user.id != action.payload.id)
          .concat(action.payload),
        users: state.users
          .filter((user) => user.id != action.payload.id)
          .concat(action.payload),
      });

    case UserActionTypes.AddUser:
      return (state = {
        ...state,
        originalUsers: state.originalUsers.concat(action.payload),
        users: state.users.concat(action.payload),
      });
    case UserActionTypes.SelectUser:
      return (state = {
        ...state,
        selectedUser: action.payload.user,
        editorReadOnly: action.payload.readonly,
      });
    case UserActionTypes.ClearUser:
      return (state = { ...state, selectedUser: null, editorReadOnly: null });
    case UserActionTypes.GetUser:
      return state;
    case UserActionTypes.GetUserSuccess:
      return (state = {
        ...state,
        users: action.payload,
        originalUsers: action.payload,
        loaded: true,
      });
    case UserActionTypes.FilterUser:
      return (state = {
        ...state,
        users: state.originalUsers
          .filter(
            (u) =>
              (action.payload.name
                ? u.name.includes(action.payload.name)
                : true) &&
              (action.payload.email
                ? u.email.includes(action.payload.email)
                : true) &&
              (action.payload.username
                ? u.username.includes(action.payload.username)
                : true)
          )
          .sort((a, b) =>
            action.payload.nameFilterDescending
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          ),
        loaded: true,
      });
    case UserActionTypes.GetUserFailure:
      return state;

    case UserActionTypes.DeleteUser:
      return (state = {
        ...state,
        users: state.users.filter((user) => user.id != action.payload),
        originalUsers: state.originalUsers.filter(
          (user) => user.id != action.payload
        ),
      });
    default:
      return state;
  }
};
