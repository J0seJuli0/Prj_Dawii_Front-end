import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoDTO } from '../../models/empleado.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ActualizarRolModalComponent } from '../actualizar-rol-modal/actualizar-rol-modal.component';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleado.component.html',
  styleUrls: ['./lista-empleado.component.scss'],
  standalone: true, 
  imports: [
    CommonModule,
    MatTableModule,           
    MatPaginatorModule,      
    MatSortModule,
    MatIconModule,
    MatDialogModule    
  ],
})
export class ListaEmpleadosComponent implements OnInit {

  displayedColumns: string[] = [
    'idEmpleado',
    'nombres',
    'apellidos',
    'fechaNacimiento',
    'descripcion',
    'docIdentidad',
    'salario',
    'fechaIngreso',
    'estado',
    'acciones'
  ];
  
  empleados: EmpleadoDTO[] = [];
  dataSource: MatTableDataSource<EmpleadoDTO> = new MatTableDataSource<EmpleadoDTO>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private empleadosService: EmpleadosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.loading = true;
    this.empleadosService.listarEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.dataSource.data = this.empleados;  

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;  
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los empleados', error);
        this.loading = false;
      }
    });
  }

  actualizarRol(idEmpleado: string): void {
    const dialogRef = this.dialog.open(ActualizarRolModalComponent, {
      width: '400px',  // Puedes ajustar el tamaño del modal
      data: { idEmpleado }  // Pasamos el idEmpleado al modal
    });
  
    // Cuando el modal se cierre, podemos obtener el rol seleccionado
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí manejarías la lógica para actualizar el rol en el backend
        console.log('Rol seleccionado para el empleado:', result);
        console.log('ID del empleado:', idEmpleado); // Verifica el idEmpleado enviado
      }
    });
  }
  
  

  pageEvent(event: any): void {
    console.log('Evento de paginación:', event);
  }
}
