import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from './action-types';
import { state } from '@angular/animations';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const authState: AuthState = {
  user: undefined
};

// export const reducers: ActionReducerMap<AuthState> = {};


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
