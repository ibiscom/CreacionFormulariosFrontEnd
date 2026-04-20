import { Component, Input } from '@angular/core';
import { SeccionEntity } from '../../../../entidades/forms-captura/seccion.entity';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { ComponentesComponent } from '../componentes/componentes.component';

@Component({
  selector: 'frm-seccion',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
    ComponentesComponent,
  ],
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.scss',
})
export class SeccionComponent {
  @Input() public seccion?: SeccionEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  constructor() {}
  ngOnInit(): void {
    console.debug('Sección:', this.seccion);
  }

  public hasComponentes(value: unknown): boolean {
    if (value === '' || value === null || value === undefined) {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return true;
  }
}
