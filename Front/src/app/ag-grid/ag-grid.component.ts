import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; 
import type { ColDef } from 'ag-grid-community'; 
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
    selector: 'app-ag-grid',
    standalone: true,
    template:'./ag-grid.component.html',
    styleUrls: ['./ag-grid.component.css'],
    imports: [AgGridAngular, FormsModule, CommonModule], 
})

export class AgGridComponent {
    rowData = [
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ];

    colDefs: ColDef[] = [
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ];
}