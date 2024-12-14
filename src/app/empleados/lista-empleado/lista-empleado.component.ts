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

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleado.component.html',
  styleUrls: ['./lista-empleado.component.scss'],
  standalone: true, // Marca este componente como independiente
  imports: [
    CommonModule,
    MatTableModule,           // Importa MatTableModule
    MatPaginatorModule,       // Importa MatPaginatorModule
    MatSortModule             // Importa MatSortModule
  ],
})
export class ListaEmpleadosComponent implements OnInit {

  displayedColumns: string[] = ['idEmpleado', 'nombres', 'apellidos', 'docIdentidad'];
  empleados: EmpleadoDTO[] = [];
  dataSource: MatTableDataSource<EmpleadoDTO> = new MatTableDataSource<EmpleadoDTO>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.loading = true;
    this.empleadosService.listarEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.dataSource.data = this.empleados;  // Asignamos los datos a la tabla

        if (this.paginator) {
          this.dataSource.paginator = this.paginator; // Configuramos el paginador
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;  // Configuramos el ordenamiento
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los empleados', error);
        this.loading = false;
      }
    });
  }

  pageEvent(event: any): void {
    console.log('Evento de paginación:', event);
  }
}
