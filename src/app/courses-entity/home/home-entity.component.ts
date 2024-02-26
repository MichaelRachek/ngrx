import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseEntityDialogComponent } from '../edit-course-dialog/edit-course-entity-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CourseEntityService } from '../services/course-entity.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'home-course-entity',
  templateUrl: './home-entity.component.html',
  styleUrls: ['./home-entity.component.css']
})
export class HomeEntityComponent implements OnInit {
  promoTotal$: Observable<number>;
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private dialog: MatDialog,
    private service: CourseEntityService) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.service.entities$
      .pipe(map(courses => courses.filter(item => item.category === 'BEGINNER')));
    this.advancedCourses$ = this.service.entities$
      .pipe(map(courses => courses.filter(item => item.category === 'ADVANCED')));
    this.promoTotal$ = this.service.entities$
      .pipe(map(courses => courses.filter(item => item.promo).length)
      );
  }

  addNewCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Create Course',
      mode: 'create'
    };

    this.dialog.open(EditCourseEntityDialogComponent, dialogConfig);
  }
}
