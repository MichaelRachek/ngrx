import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from './action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const authState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  authState,
  on(AuthActions.LoginAction, (state, action) => {
    return {
      ...state,
      user: action.user
    }
  }),

  on(AuthActions.LogoutAction, (state, action) => {
    return {
      ...state,
      user: undefined
    }
  })
)
