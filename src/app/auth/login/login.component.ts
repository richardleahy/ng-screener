import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { HttpResult } from '../../core/services/http-result';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';

/** Class representing an error */
class Error {
  /**
   * Array of errors
   * @type {string[]}
   */
  errors: string[];
}

/** Class representing a LoginComponent */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginForm') loginForm: NgForm;
  /** Font Awesome key icon */
  faKey = faKey;
  /** Font Awesome @ icon */
  faAt = faAt;
  /** Font Awesome spinner icon */
  faSpinner = faSpinner;
  /** User data */
  user: any = {};
  /** Form submit */
  submitted: boolean = false;
  /** Form errors */
  errors: Error;

  /**
   * Create a LoginComponent.
   * @param {AuthService} authService - Injected auth service.
   * @param {Router} router - Injected router.
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit() {}

  /**
   * Submit the form.
   */
  onSubmit() {
    this.submitted = true;
    // attempt to log in user.
    this.authService.login(this.user).subscribe((res: HttpResult) => {
      this.submitted = false;
      
      if(res.isSuccess()) {
        this.router.navigateByUrl('/');
      } else {
        this.errors = res.getErrors();
      }
    });
  }

}
