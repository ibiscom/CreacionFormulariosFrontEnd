import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { VerFormularioService } from './ver-formulario.service';
import { Constants } from '../utils/constants';
import { MessageUtil } from '../utils/message.util';
import { RouterModule } from '@angular/router';
import { FormularioJSONEntity } from '../entities/ver-formulario/formulario-json.entity';

@Component({
  selector: 'frm-ver-formulario',
  imports: [MatCardModule, RouterModule],
  templateUrl: './ver-formulario.component.html',
  styleUrl: './ver-formulario.component.scss',
})
export class VerFormularioComponent {
  public mensaje: string = '';
  public formulario?: FormularioJSONEntity;

  constructor(private verFormularioService: VerFormularioService) {}

  ngOnInit(): void {
    let nombreFormulario = 'FormularioCompletoAngular';//'FormAyudabusquedacopia';
    this.verFormularioService.getFormulario(nombreFormulario).subscribe({
      next: (response) => {
        this.formulario = JSON.parse(response.respuesta);
        console.log('Formulario cargado:', this.formulario?.titulo);
        console.log('Secciones', this.formulario?.seccionesFormulario);
      },
      error: (error) => {
        console.error('Error al cargar el formulario:', error);
        this.formulario = undefined;
        this.mensaje = MessageUtil.buildErrorMessageFrmResponse(
          Constants.ERR_VER_FORMULARIO,
          error,
        );
      },
    });
  }
}
