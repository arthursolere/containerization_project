import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { getCurrentUser, setCurrentUser } from '../helpers/current-user';

interface Task {
    id_task?: number;
    title: string;
    date?: Date;
    status?: 'todo' | 'done' | 'in-progress';
}

@Component({
    selector: 'app-chart-screen',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, HighchartsChartModule],
    templateUrl: './chart-screen.component.html',
    styleUrls: ['./chart-screen.component.css'],
    providers: [ApiService]
})
export class ChartScreenComponent {
    tasks: Task[] = [];
    updateFlag = false;
    constructor(private apiService: ApiService) { }
    qqc = 0
    highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        series: this.formatSeries(0, 0, 0),
    };

      ngOnInit(): void {
        this.loadTasks();
      }

    loadTasks() {
        const currentUser = getCurrentUser();
        if (!currentUser)
        {
            console.log('Utilisateur non trouvé')
            return;
        }
        this.apiService.listTask(currentUser.id).subscribe({
            next: (tasks: Task[]) => {
                console.log('taches', this.tasks);
                const noOfTodos = tasks.filter((task) => task.status == 'todo').length;
                const noOfInProgress = tasks.filter((task) => task.status == 'in-progress').length;
                const noOfDones = tasks.filter((task) => task.status == 'done').length;
                this.chartOptions.series = this.formatSeries(noOfDones, noOfTodos, noOfInProgress);

                this.updateFlag = true
            },
            error: (error: any) => {
                console.error('Erreur lors de la récupération des tâches', error);
            }
        });
    }

formatSeries(accomplished: number, todo: number, inprogres: number): Highcharts.SeriesOptionsType[] {
    return [
        {
            name: 'Tâches',
            type: 'pie',
            data: [
                { name: 'Done', y: accomplished, color: '#4CAF50' },
                { name: 'In Progress', y: inprogres, color: '#FFC107' },
                { name: 'To do', y: todo, color: '#F44336' }
            ]
        }
    ]
}

    createChart() {
        this.chartOptions = {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Répartition des tâches'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [
                {
                    name: 'Tâches',
                    type: 'pie',
                    data: [
                        { name: 'Accomplies', y: 10, color: '#4CAF50' },
                        { name: 'En cours', y: 5, color: '#FFC107' },
                        { name: 'À faire', y: 3, color: '#F44336' }
                    ]
                }
            ]
        };
        console.log('Options du graphique :', this.chartOptions);
    }

}
