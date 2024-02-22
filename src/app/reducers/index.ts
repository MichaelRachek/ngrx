import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { isDevMode } from '@angular/core';

export interface AppState {
  // auth: AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [logger] : [];

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action: ', action);
    const newState = reducer(state, action);
    console.log('state after: ', newState);
    return newState;
  }
}
