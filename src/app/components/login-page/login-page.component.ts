import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreatedUser } from 'src/app/models/res-created-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
  export class LoginPageComponent {

  authError = '';
  authErrorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }


  form = new FormGroup({
    login: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  submit() {
    this.form.disable();

    const user ={
      login: this.form.value.login,
      password: this.form.value.password
    };

    let usersArr: CreatedUser[] = [];

    this.auth.login(user).subscribe(
      () => {
        this.authErrorMessage = '';
        this.authError = '';
        alert('Log In is done!');
        this.router.navigate(['/main-route']);

        this.auth.getCurrentUser().subscribe( (users) => {
          usersArr = usersArr.concat(users);
          const currentUser = usersArr.find(el => el.login === user.login);
          if (currentUser?._id !== null && currentUser?._id !== undefined) {
            localStorage.setItem('user-id', currentUser._id);
          }
        });
      },

      error => {
        this.form.enable();

        this.authError = error.error.message;
        this.authErrorMessage = 'Login or password entered incorrectly! Try again!';
      }
    );
  }
}
