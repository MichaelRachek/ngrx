import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppState } from '../../reducers';
import { LoginAction } from '../store/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router, private store: Store<AppState> ) {
  }

  ngOnInit() {
    this.createForm();
  }

  login() {
    const { email, password } = this.form.getRawValue();

    this.auth.login(email, password)
      .subscribe(user => {
        this.store.dispatch(LoginAction({user}));
        this.router.navigateByUrl('/courses');
      },
      () => alert('Login Failed'));
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

}
