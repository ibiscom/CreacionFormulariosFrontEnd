import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { PlantillaFormCapturaService } from './plantilla-form-captura.service';
import { Constants } from '../../../utilidades/constants';
import { MessageUtil } from '../../../utilidades/message.util';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { VisorComponent } from './visor/visor.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAyudaComponent } from './dialog-ayuda/dialog-ayuda.component';
import { ComponentesEntity } from '../../../entidades/forms-captura/componentes.entity';
import { ComponenteBaseEntity } from '../../../entidades/forms-captura/componente-base.entity';
import { SeccionEntity } from '../../../entidades/forms-captura/seccion.entity';

@Component({
  selector: 'frm-plantilla-form-captura',
  imports: [MatCardModule, RouterModule, VisorComponent, FormsModule],
  templateUrl: './plantilla-form-captura.component.html',
  styleUrl: './plantilla-form-captura.component.scss',
})
export class PlantillaFormCapturaComponent {

  public mensaje: string = '';
  public mensajes: string[] = [];
  public formulario?: FormularioJSONEntity;

  @Input() public id?: string;
  @Input() public modo?: string;

  public mostrarFormulario = true;
  public mostrarBotonNuevo = true;
  public mostrarBotonEdicion = true;
  public mostrarBotonEliminar = true;
  public hayAnteriorFormulario = false;

  public hayCartas = false;
  public mostrarCartas = false;
  public cartaSeleccionada = 'cartaA';
  public tipoHoja = 'letter';
  public hayRecurso = false;
  public hayRecursoWord = false;
  public firmable = false;
  public popupFirmaVisible = false;
  public urlPopupFirma = 'about:blank';
  public nombreCarta = 'Plantilla';
  public recursoPdfUrl = '#';
  public recursoWordUrl = '#';

  public hayComponentesMail = false;
  public idMailSeleccionado = '';
  public componentesMail: Array<{ label: string; value: string }> = [];

  public clicksGuardar = 0;

  constructor(
    protected plantillaFormCapturaService: PlantillaFormCapturaService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    console.debug('Modo recibido:', this.modo);
    if (!this.modo) {
      this.modo = 'ver'; // Valor predeterminado si no se proporciona un modo
      console.debug('Modo no proporcionado, se establece el modo predeterminado:', this.modo);
    }
    this.consultarFormulario();
  }

  public consultarFormulario(): void {
    if (!this.id) {
      console.error('No se proporcionó un ID de formulario.');
      return;
    }

    this.plantillaFormCapturaService.getFormulario(this.id).subscribe({
      next: (response) => {
        this.formulario = this.parseFormularioResponse(this.extractPayload(response));
        this.configurarEstadoFormulario();
        console.debug('Formulario cargado:', this.formulario?.titulo);
        console.debug('Secciones', this.formulario?.seccionesFormulario);
      },
      error: (error) => {
        console.error('Error al cargar el formulario:', error);
        this.formulario = undefined;
        this.mensaje = MessageUtil.buildErrorMessageFrmResponse(
          Constants.ERR_VER_FORMULARIO,
          error,
        );
        this.addMensaje(this.mensaje);
      },
    });
  }

  public asBool(value: unknown): boolean {
    return value === true || value === 'true';
  }

  public addMensaje(message: string): void {
    if (!message) {
      return;
    }
    this.mensajes = [message, ...this.mensajes].slice(0, 6);
  }

  public abrirVentanaAyuda(): void {
    this.dialog.open(DialogAyudaComponent, {
      width: '420px',
      data: {
        nombreFormulario: this.formulario?.titulo || 'Formulario',
        contenidoAyuda: this.formulario?.htmlAyuda || '',
      },
    });
  }

  public prevencionDobleClic(): boolean {
    this.clicksGuardar += 1;
    return this.clicksGuardar > 1;
  }

  public resetPrevencionDobleClic(): void {
    this.clicksGuardar = 0;
  }

  public guardarFormulario(): void {
    if (!this.formulario || this.prevencionDobleClic()) {
      return;
    }

    if (this.modo !== 'diligenciar') {
      this.addMensaje('El formulario esta en modo solo lectura.');
      this.resetPrevencionDobleClic();
      return;
    }

    this.plantillaFormCapturaService.guardarFormulario(this.formulario).subscribe({
      next: () => {
        this.addMensaje('Registro guardado correctamente.');
        this.resetPrevencionDobleClic();
      },
      error: (error) => {
        this.addMensaje(MessageUtil.buildErrorMessageFrmResponse('No fue posible guardar el formulario.', error));
        this.resetPrevencionDobleClic();
      },
    });
  }

  public editarFormulario(): void {
    this.guardarFormulario();
  }

  public eliminarRegistro(): void {
    this.addMensaje('Operacion de cancelacion solicitada.');
  }

  public consultar(): void {
    this.addMensaje('Consulta ejecutada.');
  }

  public nuevoRegistro(): void {
    this.consultarFormulario();
    this.resetPrevencionDobleClic();
    this.addMensaje('Formulario reiniciado.');
  }

  public refrescarPagina(): void {
    this.consultarFormulario();
    this.resetPrevencionDobleClic();
    this.addMensaje('Pagina refrescada.');
  }

  public regresarAnteriorFormulario(): void {
    this.router.navigate(['/captura/lista-forms-captura']);
  }

  public generarPlantilla(): void {
    this.hayRecurso = true;
    this.hayRecursoWord = true;
    this.firmable = true;
    this.addMensaje(`Plantilla generada en formato ${this.tipoHoja}.`);
  }

  public seleccionarMail(value: string): void {
    this.idMailSeleccionado = value;
  }

  public adjuntarPlantillaMail(): void {
    if (!this.idMailSeleccionado) {
      this.addMensaje('Seleccione un componente de correo para adjuntar la plantilla.');
      return;
    }

    this.addMensaje(`Carta adjuntada al envio de correo ${this.idMailSeleccionado}.`);
  }

  public abrirPopUp(): void {
    this.popupFirmaVisible = true;
  }

  public cerrarPopUp(): void {
    this.popupFirmaVisible = false;
  }

  private extractPayload(response: unknown): unknown {
    if (response && typeof response === 'object' && 'respuesta' in response) {
      return (response as Record<string, unknown>)['respuesta'];
    }

    return response;
  }

  private parseFormularioResponse(payload: unknown): FormularioJSONEntity {
    if (typeof payload === 'string') {
      return JSON.parse(payload) as FormularioJSONEntity;
    }

    if (this.isFormularioPayload(payload)) {
      return payload;
    }

    if (payload && typeof payload === 'object') {
      const nestedPayload =
        (payload as Record<string, unknown>)['formulario'] ??
        (payload as Record<string, unknown>)['data'] ??
        (payload as Record<string, unknown>)['resultado'];

      if (this.isFormularioPayload(nestedPayload)) {
        return nestedPayload;
      }
    }

    throw new TypeError('Respuesta de formulario inválida');
  }

  private isFormularioPayload(payload: unknown): payload is FormularioJSONEntity {
    return !!payload && typeof payload === 'object' && 'seccionesFormulario' in payload;
  }

  public limpiarFormulario() {
   /* if (this.formulario)  {
  
     for (seccionEntry of  this.formulario?.seccionesFormulario | keyvalue: keepOrder; track seccionEntry.key) {
        const seccion = seccionEntry.value;
        for (campoEntry of seccion.campos | keyvalue: keepOrder; track campoEntry.key) {
          const campo = campoEntry.value;
  }}}*/
  }

  private configurarEstadoFormulario(): void {
    if (!this.formulario) {
      return;
    }

    this.mostrarFormulario = true;
    this.mostrarBotonNuevo = this.asBool(this.formulario.nuevo);
    this.mostrarBotonEdicion = this.asBool(this.formulario.edicion);
    this.mostrarBotonEliminar = this.asBool(this.formulario.eliminable);
    this.hayCartas = this.asBool(this.formulario.plantillasMostrables);
    this.mostrarCartas = this.hayCartas;
    this.hayAnteriorFormulario = this.modo === 'diligenciar';

    this.configurarListaMails();
  }

  private configurarListaMails(): void {
    if (!this.formulario) {
      this.componentesMail = [];
      this.hayComponentesMail = false;
      this.idMailSeleccionado = '';
      return;
    }

    const mails: Array<{ label: string; value: string }> = [];
    for (const seccion of Object.values(this.formulario.seccionesFormulario)) {
      const bloques: Array<ComponentesEntity | ''> = [
        seccion.componentesIzq,
        seccion.componentesCent,
        seccion.componentesDer,
      ];

      for (const bloque of bloques) {
        for (const componente of this.getComponentList(bloque)) {
          if (this.asBool(componente.mailType)) {
            const value = componente.id ?? componente.nombre;
            mails.push({ label: componente.nombre, value });
          }
        }
      }
    }

    this.componentesMail = mails;
    this.hayComponentesMail = mails.length > 0;
    this.idMailSeleccionado = mails[0]?.value ?? '';
  }

  public getComponentList(componentes: ComponentesEntity | ''): ComponenteBaseEntity[] {
    if (componentes === '') {
      return [];
    }

    return Object.values(componentes).flatMap((entry) => (Array.isArray(entry) ? entry : entry ? [entry] : []));
  }

  public getColumnGridTemplate(seccion: SeccionEntity): string {
    const occupiedColumns = [
      seccion.componentesIzq,
      seccion.componentesCent,
      seccion.componentesDer,
    ].filter((column) => this.getComponentList(column).length > 0).length;

    return `repeat(${Math.max(occupiedColumns, 1)}, minmax(0, 1fr))`;
  }
}
