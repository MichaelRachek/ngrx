import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseEntityService } from '../services/course-entity.service';

@Component({
  selector: 'course-course-entity-dialog',
  templateUrl: './edit-course-entity-dialog.component.html',
  styleUrls: ['./edit-course-entity-dialog.component.css']
})
export class EditCourseEntityDialogComponent implements OnInit {

  form: FormGroup;
  dialogTitle: string;
  course: Course;
  mode: 'create' | 'update';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private service: CourseEntityService) {

    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;
  }

  ngOnInit() {
    const formControls = {
      description: ['', Validators.required],
      category: ['', Validators.required],
      longDescription: ['', Validators.required],
      promo: ['', []]
    };

    if (this.mode == 'update') {
      this.form = this.fb.group(formControls);
      this.form.patchValue({...this.data.course});
    } else if (this.mode == 'create') {
      this.form = this.fb.group({
        ...formControls,
        url: ['', Validators.required],
        iconUrl: ['', Validators.required]
      });
    }
  }

  onSave() {
    const course: Course = {
      ...this.course,
      ...this.form.value
    };

    if (this.mode === 'update') {
      this.service.update(course);
      this.dialogRef.close();
    } else {
      this.service.add(course).subscribe(resp => {
        this.dialogRef.close();
      });
    }
  }

}
