import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEntityComponent } from './home/home-entity.component';
import { CoursesEntityCardListComponent } from './courses-card-list/courses-entity-card-list.component';
import { EditCourseEntityDialogComponent } from './edit-course-dialog/edit-course-entity-dialog.component';
import { CourseEntityComponent } from './course/course-entity.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';

import { CourseResolver } from './services/course.resolver';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { CourseEntityService } from './services/course-entity.service';
import { CourseDataService } from './services/course-data.service';
import { compareCourses } from './model/course';
import { compareLessons } from '../courses/model/lesson';
import { LessonEntityService } from './services/lesson-entity.service';

export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeEntityComponent,
    resolve: { courses: CourseResolver }

  },
  {
    path: ':courseUrl',
    component: CourseEntityComponent
  }
];

const entityMetadata: EntityMetadataMap = {
  Course: {
    // for correct ids order
    sortComparer: compareCourses,
    // remove delay for resp in update/add/remove
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true

      // use only when Id generate on FE side
      // optimisticAdd: true
    }
  },
  Lesson: {
    sortComparer: compareLessons
  }
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes)
  ],
  declarations: [
    HomeEntityComponent,
    CoursesEntityCardListComponent,
    EditCourseEntityDialogComponent,
    CourseEntityComponent
  ],
  exports: [
    HomeEntityComponent,
    CoursesEntityCardListComponent,
    EditCourseEntityDialogComponent,
    CourseEntityComponent
  ],
  providers: [
    CourseResolver,
    CourseEntityService,
    CourseDataService,
    LessonEntityService
  ]
})
export class CoursesEntityModule {
  constructor(private eds: EntityDefinitionService,
              private entityDataService: EntityDataService,
              private courseDataService: CourseDataService) {
    eds.registerMetadataMap(entityMetadata);

    // if we use some custom mapper or costomise ips methods, for example our urls different that ngrx expects
    entityDataService.registerService('Course', courseDataService);
  }
}
