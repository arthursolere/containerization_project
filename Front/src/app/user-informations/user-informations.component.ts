import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { getCurrentUser, setCurrentUser } from '../helpers/current-user';

interface User {
  id: number;
  pseudo: string;
  name: string;
  password: string;
  email: string;
}

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-informations.component.html',
  styleUrls: ['./user-informations.component.css']
})
export class UserInformationComponent implements OnInit {
  userInfo: User = {
    id: 0,
    pseudo: '',
    name: '',
    password: '',
    email: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const currentUser = getCurrentUser();
    if (currentUser) {
      this.userInfo.id = currentUser.id;
      this.userInfo.pseudo = currentUser.pseudo;
      this.userInfo.name = currentUser.name;
      this.userInfo.email = currentUser.email;
    }
  }

  saveUserInfo() {
    const updatedUserInfo : User = {
      id: this.userInfo.id,
      pseudo: this.userInfo.pseudo,
      name: this.userInfo.name,
      password: this.userInfo.password,
      email: this.userInfo.email 
    };

    console.log('user-informations.components.ts', 'saveUserInfo', updatedUserInfo)

    this.apiService.updateUserInfo(updatedUserInfo).subscribe({
      next: (user) => {
        setCurrentUser(user);
        console.log('✅ Informations utilisateur mises à jour avec succès', user);
        alert('Les informations utilisateur ont été mises à jour avec succès !');
      },
      error: (error) => {
        console.error('❌ Erreur lors de la mise à jour des informations utilisateur', error);
        alert('Une erreur est survenue lors de la mise à jour des informations utilisateur.');
      }
    });
  }
}
