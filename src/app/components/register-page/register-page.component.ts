import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    login: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPassword: new FormControl<string>('', [
      Validators.required
    ])
  });

  submit() {
    this.form.disable();

    const user ={
      name: this.form.value.name,
      login: this.form.value.login,
      password: this.form.value.password
    };

    this.auth.register(user).subscribe(
      (currentUser) => {
        this.auth.setCurrentUser(currentUser);

        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      },

      error => {
        alert(error);
        this.form.enable();
      }
    );
  }
}
