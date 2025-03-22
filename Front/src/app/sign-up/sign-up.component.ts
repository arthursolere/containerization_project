import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SignInComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [ApiService]
})
export class SignUpComponent {
  constructor(private apiService: ApiService) {}
  users: any[] = [];
  email: string = '';
  password: string = '';
  pseudo: string = '';
  firstname: string = '';
  created : boolean = false;
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
  addUser() {
    if (this.email && this.password && this.pseudo && this.firstname) {
      const newUser = { email: this.email, password: this.password, pseudo: this.pseudo, firstname: this.firstname };
      this.apiService.createUser(newUser).subscribe(
        (response) => {
          console.log('Utilisateur ajouté avec succès!', response);
          this.loadUsers(); 
          this.created = true;
        },
        (error) => {
          console.log('Erreur lors de l\'ajout de l\'utilisateur', error, this.email);
          window.alert('Il y a déjà un utilisateur avec cet email.');
        }
      );
    } else {
      console.log('Email et mot de passe requis.');
      window.alert('Email et mot de passe requis.');
    }
  }
}
