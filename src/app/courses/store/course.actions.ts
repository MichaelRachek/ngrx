import { createAction, props, UPDATE } from '@ngrx/store';
import { Course } from '../model/course';
import { Update } from '@ngrx/entity';

export const loadAllCourses = createAction(
  '[Courses Resolver] Load All Courses'
);

export const allCoursesLoaded = createAction(
  '[Load Courses Effect] All Courses Loaded',
  props<{courses: Course[]}>()
);

export const courseUpdated = createAction(
  '[Edit Course Dialog]: Course updated',
  props<{update: Update<Course>}>()
);

