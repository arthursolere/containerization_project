import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { log } from 'console';
import { Observable } from 'rxjs';
import { User } from './helpers/current-user';

enum TaskStatus {
    ToDo,
    Done,
    InProgress
}

interface Task {
    title: string;
    date: Date;
    status: 'todo' | 'done' | 'in-progress';
}

@Injectable({
  providedIn: 'root', 
})
export class ApiService {
    private base_url = 'http://localhost:3000';
    private apiUrl_select = `${this.base_url}/users/list`;
    private apiUrl_insert = 'http://localhost:3000/users/create';
    private apiUrl_create_task = 'http://localhost:3000/tasks/create';
    constructor(private http: HttpClient) {}

    getUsers()
    {
        return this.http.get(this.apiUrl_select);
    }

    createUser(user: any)
    {
        return this.http.post(this.apiUrl_insert, user);
    }
    
    connectUser(user: any): Observable<User>
    {
        const apiUrl_connect = 'http://localhost:3000/users/' + user.email;
        console.log(apiUrl_connect);
        return this.http.get<User>(apiUrl_connect, {
            params: user,
        });
    }
    
    addTask(task: Partial<Task>)
    {
        const apiUrl_insert = 'http://localhost:3000/tasks/create';
        console.log(task.title)
        return this.http.post(apiUrl_insert, task);
    }

    listTask(id_client: number): Observable<Task[]>
    {
        const apiUrl_list = 'http://localhost:3000/tasks/list/'+id_client;
        return this.http.get<Task[]>(apiUrl_list);
    }

    updateTaskStatus(id_task: number, status: 'done' | 'in-progress'): Observable<any> {
        const apiUrl_update = 'http://localhost:3000/tasks/update';
        return this.http.post(apiUrl_update, { id_task, status });
    }

    deleteTask(id_task: number): Observable<any> {
        const apiUrl_delete = `http://localhost:3000/tasks/del`;
        return this.http.post(apiUrl_delete, {id_task});
    }

    updateUserInfo(user: Partial<User>): Observable<any> {
        const apiUrl_update = 'http://localhost:3000/users/update/'+ user.id;
        return this.http.post(apiUrl_update, user);
    }

    shareTask(email : string, title : string) : Observable<any>
    {
        const apiUrl_share = 'http://localhost:3000/shared-tasks/create';
        return this.http.post(apiUrl_share, { email, title})
    }
}
