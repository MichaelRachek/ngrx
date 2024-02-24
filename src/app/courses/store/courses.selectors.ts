import { createFeatureSelector,  createSelector } from '@ngrx/store';

import * as fromCourses from  './course.reducer';
export const selectCoursesState = createFeatureSelector<fromCourses.CoursesState>('courses');

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectCoursesByCategory = (category: string) => {
 return createSelector(
   selectAllCourses,
   courses => courses.filter(course => course.category === category)
 )
};

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const areAllCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
