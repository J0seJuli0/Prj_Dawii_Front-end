import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpleadosService } from '../../services/empleados.service';
import { RolDTO } from '../../models/rol';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-rol-modal',
  templateUrl: './actualizar-rol-modal.component.html',
  styleUrls: ['./actualizar-rol-modal.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ]
})
export class ActualizarRolModalComponent {
  idEmpleado: string;
  roles: RolDTO[] = [];
  selectedRolId: string | null = null;
  errorMessage: string | null = null; 

  constructor(
    private empleadosService: EmpleadosService,
    private dialogRef: MatDialogRef<ActualizarRolModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idEmpleado: string },
    private snackBar: MatSnackBar // Para mostrar errores o mensajes
  ) {
    this.idEmpleado = data.idEmpleado; 
  }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles(): void {
    this.empleadosService.listarRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        if (roles.length > 0) {
          // Establecer un rol por defecto si es necesario
          this.selectedRolId = roles[0].idRol; 
        }
      },
      error: (error) => {
        console.error('Error al obtener los roles', error);
        this.errorMessage = 'No se pudo obtener la lista de roles. Intente nuevamente más tarde.';
        this.snackBar.open(this.errorMessage, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  onRolSelect(event: MatSelectChange): void {
    this.selectedRolId = event.value;
  }

  guardar(): void {
    if (this.selectedRolId) {
      // Llamamos al servicio para actualizar el rol
      this.empleadosService.actualizarRol(this.idEmpleado, this.selectedRolId).subscribe({
        next: () => {
          // Si la actualización fue exitosa, cerramos el modal y pasamos el idRol actualizado
          this.dialogRef.close(this.selectedRolId);
        },
        error: (error) => {
          // Mostrar mensaje de error en caso de fallo
          console.error('Error al actualizar el rol', error);
          this.errorMessage = 'No se pudo actualizar el rol. Intente nuevamente.';
          this.snackBar.open(this.errorMessage, 'Cerrar', {
            duration: 3000,
          });
        }
      });
    } else {
      this.errorMessage = 'Debe seleccionar un rol antes de guardar.';
      this.snackBar.open(this.errorMessage, 'Cerrar', {
        duration: 3000,
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
