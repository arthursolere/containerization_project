import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ApiService } from '../api.service';
import { setCurrentUser } from '../helpers/current-user';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SignUpComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [ApiService]
})
export class SignInComponent {
  constructor(private apiService: ApiService, private router: Router) {}
  users: any[] = [];
  email: string = '';
  password: string = '';
  pseudo: string = '';
  firstname: string = '';

  loadUsers() {
    this.apiService.getUsers().subscribe(
      (response: any) => {
        this.users = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  connectUser() {
    if (this.email && this.password) {
      const user = { email: this.email, password: this.password };
      this.apiService.connectUser(user).subscribe({
        next: (user) => {
          console.log('Connexion réussie', user);
          setCurrentUser(user);
          this.router.navigate(['']);
          this.loadUsers();
        },
        error: (error) => {
          console.log('Connexion refusée', error);
          window.alert('Email ou mot de passe incorrect.');
        }
      });
    } else {
      console.log('Email et mot de passe requis.');
      window.alert('Email et mot de passe requis.');
    }
  }
}