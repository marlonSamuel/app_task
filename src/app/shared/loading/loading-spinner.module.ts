import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component'; // Ajusta la ruta según tu estructura de archivos
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [
    CommonModule,    
    MatProgressSpinnerModule,
    MatDialogModule], // Asegúrate de importar CommonModule si usas directivas como ngIf o ngFor
  exports: [LoadingSpinnerComponent] // Exporta el componente para que pueda ser utilizado en otros módulos
})

export class LoadingSpinnerModule {}