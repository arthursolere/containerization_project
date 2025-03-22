import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ApiService } from '../api.service';
import { Interface } from 'readline';
import { getCurrentUser } from '../helpers/current-user';

 interface Task{
    id_task?: number;
    title: string;
    date?: Date;
    status?: 'todo' | 'done' | 'in-progress';
 }
  
@Component({
    selector: 'app-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, SignUpComponent],
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
    providers: [ApiService]
})
export class FormComponent {
    tasks: Task[] = [];
    title?: string;
    date?: Date;
    status: 'todo' | 'done' | 'in-progress' = 'todo';

    constructor(private apiService: ApiService, private router: Router) {}

    ngOnInit() {
        this.showTask();
    }

    addTask() {
        if (!this.title) {
            console.log('Titre requis.');
            window.alert('Titre requis.');
            return;
        }

        const currentUser = getCurrentUser();
        if (!currentUser) {
            console.error('No current user.');
            return;
        }

        if (!this.date) {
            this.date = new Date();
        }

        const task = { title: this.title, date: this.date, id_client: currentUser.id, status: this.status };
        this.apiService.addTask(task).subscribe({
            next: (response) => {
                console.log('Tâche créée', task.title);
                this.tasks.push(response as Task);
                this.title = '';
                this.date = undefined;
                this.router.navigate(['']);
                window.location.reload();
            },
            error: (error) => {
                console.log('Tâche non créée', error);
            }
        });
    }

    updateTaskStatus(task: Task, status: 'done' | 'in-progress') {
        task.status = status;
        console.log('title ', task.title);
        console.log('statut : ', status);
        console.log('id', task.id_task);
        this.apiService.updateTaskStatus(task.id_task as number, status).subscribe({
            next: () => {
                console.log(`Tâche mise à jour : ${task.title} -> ${status}`);
            },
            error: (error: any) => {
                console.error('Erreur lors de la mise à jour du statut', error);
            }
        });
    }

    showTask() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            console.error('No current user.');
            return;
        }
        this.apiService.listTask(currentUser.id).subscribe({
            next: (tasks) => {
                tasks.forEach(task => console.log('Tâche:', task));
                this.tasks = tasks;
            },
            error: (error) => {
                console.error('Erreur lors de la récupération des tâches', error);
            }
        });
    }

    deleteTask(task: Task) {
        if (!task.id_task) {
            console.error('Task ID is required to delete a task.');
            return;
        }

        this.apiService.deleteTask(task.id_task).subscribe({
            next: () => {
                console.log(`Tâche supprimée : ${task.title}`);
                this.showTask(); 
                this.router.navigate(['']);
                window.location.reload();
            },
            error: (error: any) => {
                console.error('Erreur lors de la suppression de la tâche', error);
            }
        });
    }
    }

  