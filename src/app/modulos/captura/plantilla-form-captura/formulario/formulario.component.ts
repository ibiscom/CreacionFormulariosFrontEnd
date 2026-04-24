import { Component, Input } from '@angular/core';
import { SeccionesFormularioComponent } from '../secciones-formulario/secciones-formulario.component';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { FormularioJSONEntity } from '../../../../entidades/forms-captura/formulario-json.entity';
import { DialogAyudaComponent } from '../dialog-ayuda/dialog-ayuda.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'frm-formulario',
  imports: [SeccionesFormularioComponent, MatButtonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss',
})
export class FormularioComponent {

  @Input() public formulario?: FormularioJSONEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public mostrarAyuda() {
     const dialogRef = this.dialog.open(DialogAyudaComponent, {
      width: '400px',
      data: { nombreFormulario: this.formulario?.titulo || 'Formulario',
              contenidoAyuda: this.formulario?.htmlAyuda || '' 
       } 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.debug('Diálogo de ayuda cerrado', result);
    });
  }
}
