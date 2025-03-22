import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { getCurrentUser } from '../helpers/current-user';

@Component({
    selector: 'app-shared-tasks',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './shared-tasks.component.html',
    providers: [ApiService]
})
export class SharedTasksComponent {
    dest_user?: string;
    task_title?: string;

    constructor(private apiService: ApiService, private router: Router) {}

    shareTask() {
        const currentUser = getCurrentUser();
        if (this.dest_user && this.task_title) {
            this.apiService.shareTask(this.dest_user, this.task_title).subscribe({
                next: (response) => {
                    console.log('Tâche partagée avec succès', this.task_title);
                    window.alert('Tâche partagée avec succès')
                    this.dest_user = '';
                    this.task_title = undefined;
                    window.location.reload();
                },
                error: (error) => {
                    console.log('Erreur lors du partage de la tâche', this.dest_user, this.task_title);
                }
            });
        } else {
            console.error('Veuillez remplir tous les champs.');
        }
    }
}
