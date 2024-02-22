import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { loadAllCourses } from '../store/course.actions';

@Injectable()
export class CourseResolver {

  constructor(private store: Store<AppState>) { }

  resolve(): Observable<any> {
    return this.store.pipe(
      first(),
      tap(() => {
        this.store.dispatch(loadAllCourses());
      })
    );
  }

}
