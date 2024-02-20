import { createSelector } from '@ngrx/store';
import { AppState } from '../../reducers';


const selectAuth = (state: AppState) => state['auth'];
export const isLoggedIn = createSelector(
  selectAuth,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  selectAuth,
  (auth) => !auth.user
);
