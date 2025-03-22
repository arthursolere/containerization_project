import { Component } from '@angular/core';
import { ApiService } from './api.service';
import {HttpClient} from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
  providers: [ApiService, HttpClient]
})

export class AppComponent {
  constructor(private apiService: ApiService) {}
  title = 'Front';
  users: any[] = [];
  email = '';
  password = '';
  pseudo = '';
  name = '';
  ngOnInit() {
  }

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
  

}
