import * as fromReducer from './users.reducer';

import { GetUserSuccess } from './users.actions';

describe('UsersReducer', () => {
  it('should return the users state', () => {
    const { initialState } = fromReducer;
    const action = new GetUserSuccess([
      {
        name: 'someone',
        id: 100,
        username: 'someone',
        address: null,
        company: null,
        email: '',
        phone: '',
        website: '',
      },
    ]);
    const state = fromReducer.reducer(initialState, action);

    expect(state.loaded).toBeTruthy;
    expect(state.originalUsers.length).toBeGreaterThan(0);
  });
});
