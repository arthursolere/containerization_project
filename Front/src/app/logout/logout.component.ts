import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { removeCurrentUser } from '../helpers/current-user';

@Component({
  selector: 'app-logout',
  standalone: true,
  templateUrl: './logout.component.html',
  imports: [CommonModule, RouterModule],
})
export class LogoutComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.logoutUser();
  }

  logoutUser() {
    removeCurrentUser();  
    console.log('Logout')  
    this.router.navigate(['']);
  }
}