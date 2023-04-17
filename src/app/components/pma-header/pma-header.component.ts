import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pma-header',
  templateUrl: './pma-header.component.html',
  styleUrls: ['./pma-header.component.scss']
})
export class PmaHeaderComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

}
