import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from '../auth/store';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {
  // auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}
