import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction';
import { ApiService } from '../api.service';
import { getCurrentUser, setCurrentUser } from '../helpers/current-user';

interface Task {
    id?: number;
    title: string;
    date: Date;
    status?: 'todo' | 'done' | 'in-progress';
  }
  

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  imports: [FullCalendarModule],
  providers : [ApiService]
})
export class CalendarComponent {
    constructor(private apiService: ApiService) {}
    ngOnInit() {
        this.refresh_events();
      }
    refresh_events() {
        const currentUser = getCurrentUser();
        if (!currentUser)
        {
            console.log('Utilisateur non trouvé')
            return;
        }
        this.apiService.listTask(currentUser.id).subscribe((tasks: Task[]) => {
            this.calendarOptions = {
                ...this.calendarOptions, 
                events: tasks.map(task => ({
                    title: task.title, 
                    start: task.date 
                }))
            };
        });
    }
    
  calendarOptions: CalendarOptions = {
    plugins : [timeGridPlugin, interactionPlugin],
    initialView: 'timeGridDay', 
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth'
    },
    events: [],
    editable: true 
  };
}
