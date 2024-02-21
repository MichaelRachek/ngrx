import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.LoginAction),
      tap(action =>
        localStorage.setItem('user', JSON.stringify(action.user)))
    ), { dispatch: false });

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.LogoutAction),
      tap(action =>
        localStorage.removeItem('user'))
    ), { dispatch: false });
  constructor(private actions$: Actions) {
  }
}
