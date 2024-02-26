import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { CourseEntityService } from './course-entity.service';

@Injectable()
export class CourseResolver {
  constructor(private coursesService: CourseEntityService) { }

  resolve(): Observable<boolean> {
    return this.coursesService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.coursesService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }

}
