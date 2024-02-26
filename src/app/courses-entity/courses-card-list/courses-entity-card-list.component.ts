import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Course } from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCourseEntityDialogComponent } from '../edit-course-dialog/edit-course-entity-dialog.component';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'courses-course-entity-card-list',
  templateUrl: './courses-entity-card-list.component.html',
  styleUrls: ['./courses-entity-card-list.component.css']
})
export class CoursesEntityCardListComponent {

  @Input()
  courses: Course[];

  @Output()
  courseChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private service: CourseEntityService) {
  }

  editCourse(course: Course) {

    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: 'Edit Course',
      course,
      mode: 'update'
    };

    this.dialog.open(EditCourseEntityDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.courseChanged.emit());

  }

  onDeleteCourse(course: Course) {
    this.service.delete(course);
  }

}









