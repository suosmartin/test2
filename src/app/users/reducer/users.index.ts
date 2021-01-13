import { MetaReducer } from '@ngrx/store';
import { UsersState } from './users.reducer';

export const metaReducers: MetaReducer<UsersState>[] = [];

// users module reducer
export const selectUsersState = (state: any) => state.users.users;
export const isLoaded = (state: any) => state.users.loaded;
export const getSelectedUser = (state: any) => state.users.selectedUser;
export const isEditorReadOnly = (state: any) => state.users.editorReadOnly;
