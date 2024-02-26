import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { CourseEntityService } from '../services/course-entity.service';
import { LessonEntityService } from '../services/lesson-entity.service';

@Component({
  selector: 'course-entity',
  templateUrl: './course-entity.component.html',
  styleUrls: ['./course-entity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEntityComponent implements OnInit {
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;
  displayedColumns = ['seqNo', 'description', 'duration'];
  nextPage = 0;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private courses: CourseEntityService,
    private lessons: LessonEntityService) {

  }

  ngOnInit() {
    const courseUrl = this.route.snapshot.paramMap.get('courseUrl');
    this.course$ = this.courses.entities$.pipe(map(courses => courses.find(item => item.url === courseUrl)));
    this.lessons$ = this.lessons.entities$
      .pipe(
        withLatestFrom(this.course$),
        tap(([_ ,course]) => {
          if (this.nextPage === 0) {
            this.loadLessonsPage(course);
          }
        }),
        map(([lessons,course]) => {
          return lessons.filter(item => item.courseId === course.id)
        })
      )

    this.loading$ = this.lessons.loading$.pipe(delay(200));
  }

  loadLessonsPage(course: Course) {
    this.lessons.getWithQuery({
      'courseId': course.id.toString(),
      'pageNumber': this.nextPage.toString(),
      'pageSize': '3'
    }).subscribe(() => {
      this.nextPage +=1;
    });
  }
}
