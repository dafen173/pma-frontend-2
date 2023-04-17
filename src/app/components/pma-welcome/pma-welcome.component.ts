import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pma-welcome',
  templateUrl: './pma-welcome.component.html',
  styleUrls: ['./pma-welcome.component.scss']
})
export class PmaWelcomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.router.navigate(['/main-route']);
    }
  }
}
