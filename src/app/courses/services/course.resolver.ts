import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { loadAllCourses } from '../store/course.actions';
import { areAllCoursesLoaded } from '../store/courses.selectors';

@Injectable()
export class CourseResolver {

  private isLoading = false;

  constructor(private store: Store<AppState>) { }

  resolve(): Observable<any> {
    return this.store.pipe(
      select(areAllCoursesLoaded),
      tap(isAllLoaded => {
        if (!this.isLoading && !isAllLoaded) {
          this.store.dispatch(loadAllCourses());
          this.isLoading = true
        }
      }),
      filter(isAllLoaded => isAllLoaded),
      first(),
      finalize(() => this.isLoading = false)
    );
  }

}
