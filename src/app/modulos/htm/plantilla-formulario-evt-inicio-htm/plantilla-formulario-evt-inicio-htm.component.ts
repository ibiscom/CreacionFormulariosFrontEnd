import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponenteBaseEntity } from '../../../entidades/forms-captura/componente-base.entity';
import { ComponentesEntity } from '../../../entidades/forms-captura/componentes.entity';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { SeccionEntity } from '../../../entidades/forms-captura/seccion.entity';
import { SelectItemEntity } from '../../../entidades/forms-captura/select-item.entity';
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../utilidades/field-value.util';
import { DialogAyudaComponent } from '../../captura/plantilla-form-captura/dialog-ayuda/dialog-ayuda.component';
import { CargaMasivaComponent } from '../../captura/plantilla-form-captura/carga-masiva/carga-masiva.component';
import { InPutTextAreaComponent } from '../../captura/plantilla-form-captura/in-put-text-area/in-put-text-area.component';
import { InPutTextComponent } from '../../captura/plantilla-form-captura/in-put-text/in-put-text.component';
import { LabelComponent } from '../../captura/plantilla-form-captura/label/label.component';
import { LinkFormToIcefacesComponent } from '../../captura/plantilla-form-captura/link-form-to-icefaces/link-form-to-icefaces.component';
import { LinkToAFormComponent } from '../../captura/plantilla-form-captura/link-to-a-form/link-to-a-form.component';
import { LinkToDifferentFormComponent } from '../../captura/plantilla-form-captura/link-to-different-form/link-to-different-form.component';
import { MailComponent } from '../../captura/plantilla-form-captura/mail/mail.component';
import { OutPutLinkComponent } from '../../captura/plantilla-form-captura/out-put-link/out-put-link.component';
import { PlantillaFormCapturaComponent } from '../../captura/plantilla-form-captura/plantilla-form-captura.component';
import { PlantillaFormCapturaService } from '../../captura/plantilla-form-captura/plantilla-form-captura.service';
import { RefreshButtonComponent } from '../../captura/plantilla-form-captura/refresh-button/refresh-button.component';
import { SaveButtonComponent } from '../../captura/plantilla-form-captura/save-button/save-button.component';
import { SearchButtonComponent } from '../../captura/plantilla-form-captura/search-button/search-button.component';
import { SelectBooleanCheckBoxComponent } from '../../captura/plantilla-form-captura/select-boolean-check-box/select-boolean-check-box.component';
import { SelectInPutDateComponent } from '../../captura/plantilla-form-captura/select-in-put-date/select-in-put-date.component';
import { SelectOneListBoxCustomizedComponent } from '../../captura/plantilla-form-captura/select-one-list-box-customized/select-one-list-box-customized.component';
import { SelectOneListBoxComponent } from '../../captura/plantilla-form-captura/select-one-list-box/select-one-list-box.component';
import { SelectOneRadioComponent } from '../../captura/plantilla-form-captura/select-one-radio/select-one-radio.component';

@Component({
  selector: 'app-plantilla-formulario-evt-inicio-htm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InPutTextComponent,
    InPutTextAreaComponent,
    SelectInPutDateComponent,
    SelectOneListBoxComponent,
    SelectBooleanCheckBoxComponent,
    OutPutLinkComponent,
    LabelComponent,
    CargaMasivaComponent,
    SelectOneRadioComponent,
    SelectOneListBoxCustomizedComponent,
    LinkToAFormComponent,
    RefreshButtonComponent,
    MailComponent,
    LinkToDifferentFormComponent,
    SaveButtonComponent,
    LinkFormToIcefacesComponent,
    SearchButtonComponent,
  ],
  templateUrl: './plantilla-formulario-evt-inicio-htm.component.html',
  styleUrl: './plantilla-formulario-evt-inicio-htm.component.scss',
})
export class PlantillaFormularioEvtInicioHtmComponent extends PlantillaFormCapturaComponent {
  @Input() public set formularioInput(value: FormularioJSONEntity | undefined) {
    if (!value) {
      return;
    }

    this.formulario = value;
    this.seedComponentValues();
  }

  public override formulario: FormularioJSONEntity = {
    titulo: 'Formulario Evento Inicio HTM',
    descripcion: 'Migracion Angular equivalente de plantillaFormularioEvtInicioHTM.jspx.',
    seccionesFormulario: {
      Seccion_1: {
        titulo: 'Datos de inicio',
        descripcion: 'Campos base para iniciar el flujo del evento.',
        guardado: 'false',
        expandido: 'true',
        componentesIzq: {
          inputNombre: this.createComponent({
            id: 'inputNombre',
            nombre: 'Nombre',
            tipoComponente: 'InPutText',
            textType: 'true',
            obligatorio: 'true',
            obligatorioFuncional: 'true',
            valor: '',
          }),
          inputDescripcion: this.createComponent({
            id: 'inputDescripcion',
            nombre: 'Descripcion',
            tipoComponente: 'InPutTextArea',
            textAreaType: 'true',
            valor: '',
          }),
          fechaSolicitud: this.createComponent({
            id: 'fechaSolicitud',
            nombre: 'Fecha solicitud',
            tipoComponente: 'SelectInPutDate',
            dateType: 'true',
            valor: '2026-07-10',
          }),
        },
        componentesCent: {
          tipoSolicitud: this.createComponent({
            id: 'tipoSolicitud',
            nombre: 'Tipo solicitud',
            tipoComponente: 'SelectOneListBox',
            listBoxType: 'true',
            obligatorioFuncional: 'true',
            valor: '',
            items: [
              { label: 'Seleccione', value: '' },
              { label: 'Inicio estandar', value: 'inicio_estandar' },
              { label: 'Inicio urgente', value: 'inicio_urgente' },
            ],
          }),
          prioridad: this.createComponent({
            id: 'prioridad',
            nombre: 'Prioridad',
            tipoComponente: 'SelectOneRadioButton',
            radioButtonType: 'true',
            valor: 'media',
            items: [
              { label: 'Alta', value: 'alta' },
              { label: 'Media', value: 'media' },
              { label: 'Baja', value: 'baja' },
            ],
          }),
        },
        componentesDer: {
          activarEnvio: this.createComponent({
            id: 'activarEnvio',
            nombre: 'Enviar notificacion',
            tipoComponente: 'SelectBooleanCheckBox',
            checkBoxType: 'true',
            valor: 'true',
          }),
          etiquetaInfo: this.createComponent({
            id: 'etiquetaInfo',
            nombre: 'Informacion',
            tipoComponente: 'Label',
            labelType: 'true',
            valor: 'Este formulario inicia una tarea de workflow.',
          }),
        },
      },
    },
    entidades: {},
    entidadPrincipal: '',
    entidadesRelacionadas: {},
    idFormularioPadre: 'vacio',
    nuevo: 'true',
    edicion: 'false',
    eliminable: 'true',
    diligenciable: 'true',
    consultable: 'false',
    plantillasMostrables: 'true',
    htmlAyuda:
      '<p>Ayuda del formulario de evento de inicio.</p><p>La informacion diligenciada se usa para iniciar el flujo.</p>',
  };

  public mensajes: string[] = [];
  public componentValues: Record<string, string | boolean> = {};
  public valoresComponentes: Record<string, string> = {};
  public clicksGuardar = 0;

  public mostrarFormulario = true;
  public diligenciable = true;
  public hayAnteriorFormulario = true;
  public mostrarBotonEliminar = true;
  public mostrarBotonTerminar = true;

  public hayCartas = true;
  public mostrarCartas = true;
  public cartaSeleccionada = 'cartaA';
  public tipoHoja = 'letter';

  public hayRecurso = true;
  public hayRecursoWord = true;
  public hayComponentesMail = true;
  public firmable = true;

  public nombreCarta = 'plantilla-evento-inicio';
  public recursoPdfUrl = '#';
  public recursoWordUrl = '#';
  public idMailSeleccionado = 'mail1';
  public componentesMail = [
    { label: 'Correo principal', value: 'mail1' },
    { label: 'Correo respaldo', value: 'mail2' },
  ];

  public popupFirmaVisible = false;
  public urlPopupFirma = 'about:blank';

  public mensajePostTerminacionTarea = '';
  public popupMensajePostTerminacionTareaVisible = false;
  public popupMensajeVisualizarErroresEnvioMailVisible = false;
  public mensajeNoEnvioMail = '';
  public simularErrorEnvioMail = false;

  public constructor(
    public dialog: MatDialog,
    protected override plantillaFormCapturaService: PlantillaFormCapturaService,
    protected override route: ActivatedRoute,
    protected override router: Router,
  ) {
    super(plantillaFormCapturaService, route, router);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.seedComponentValues();
  }

  public get secciones(): SeccionEntity[] {
    return Object.values(this.formulario.seccionesFormulario);
  }

  public asBool(value: unknown): boolean {
    return value === true || value === 'true';
  }

  public hasComponentFlag(componente: ComponenteBaseEntity, flagName: string): boolean {
    return this.asBool((componente as unknown as Record<string, unknown>)[flagName]);
  }

  public toggleSeccion(seccion: SeccionEntity): void {
    seccion.expandido = this.asBool(seccion.expandido) ? 'false' : 'true';
  }

  public getComponentList(componentes: ComponentesEntity | ''): ComponenteBaseEntity[] {
    if (componentes === '') {
      return [];
    }

    return Object.values(componentes).flatMap((entry) => (Array.isArray(entry) ? entry : entry ? [entry] : []));
  }

  public componentKey(componente: ComponenteBaseEntity): string {
    return componente.id ?? componente.nombre;
  }

  public getComponentValue(componente: ComponenteBaseEntity): string | boolean {
    const key = this.componentKey(componente);
    const stored = this.componentValues[key];
    if (stored !== undefined) {
      return stored;
    }

    const payloadValue = getFieldPayloadValue(componente.valor);

    if (this.asBool(componente.checkBoxType)) {
      return payloadValue === true || payloadValue === 'true';
    }

    return payloadValue !== undefined && payloadValue !== null ? String(payloadValue) : '';
  }

  public setComponentValue(componente: ComponenteBaseEntity, value: string | boolean): void {
    this.componentValues[this.componentKey(componente)] = value;

    const newPayload = setFieldPayloadValue(componente.valor, value);
    if (newPayload !== componente.valor) {
      (componente as unknown as { valor: unknown }).valor = newPayload;
    }
  }

  public getSelectItems(componente: ComponenteBaseEntity): Array<{ label: string; value: string }> {
    if (!componente.items) {
      return [];
    }

    return componente.items.map((item: unknown) => {
      const safeItem = item as Partial<SelectItemEntity> & { label?: string; value?: unknown };
      const rawValue = safeItem.value as { value?: unknown } | string | undefined;

      return {
        label: safeItem.label ?? '',
        value: typeof rawValue === 'object' && rawValue ? String(rawValue.value ?? '') : String(rawValue ?? ''),
      };
    });
  }

  public getMostrarAsteriscoRojo(componente: ComponenteBaseEntity): boolean {
    return this.asBool(componente.obligatorio) || (this.hayAnteriorFormulario && this.asBool(componente.obligatorioFuncional));
  }

  public getMostrarAsteriscoVerde(componente: ComponenteBaseEntity): boolean {
    return this.asBool(componente.obligatorioFuncional) && !this.hayAnteriorFormulario;
  }

  public addMensaje(message: string): void {
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

  public abrirPopUp(): void {
    this.popupFirmaVisible = true;
  }

  public cerrarPopUp(): void {
    this.popupFirmaVisible = false;
  }

  public prevencionDobleClic(): boolean {
    this.clicksGuardar += 1;
    return this.clicksGuardar > 1;
  }

  public resetPrevencionDobleClic(): void {
    this.clicksGuardar = 0;
  }

  public guardarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.addMensaje('Formulario guardado correctamente.');
    this.resetPrevencionDobleClic();
  }

  public eliminarRegistro(): void {
    this.addMensaje('Registro cancelado/eliminado.');
  }

  public nuevoRegistro(): void {
    this.componentValues = {};
    this.seedComponentValues();
    this.resetPrevencionDobleClic();
    this.addMensaje('Formulario limpiado.');
  }

  public refrescarPagina(): void {
    this.resetPrevencionDobleClic();
    this.addMensaje('Pagina refrescada.');
  }

  public regresarAnteriorFormulario(): void {
    this.addMensaje('Navegacion al formulario anterior.');
  }

  public generarPlantilla(): void {
    this.hayRecurso = true;
    this.hayRecursoWord = true;
    this.addMensaje(`Plantilla generada en formato ${this.tipoHoja}.`);
  }

  public adjuntarPlantillaPDF(): void {
    if (!this.hayRecurso) {
      this.addMensaje('No se permite anexar el documento al proceso. No se ha generado el archivo digital.');
      return;
    }

    this.addMensaje('Se anexo correctamente la planilla.');
  }

  public seleccionarMail(value: string): void {
    this.idMailSeleccionado = value;
  }

  public adjuntarPlantillaMail(): void {
    this.addMensaje(`Carta adjuntada al envio de correo ${this.idMailSeleccionado}.`);
  }

  public terminarFormulario(): void {
    this.preprocesarDatosTerminacion();

    if (!this.isCumpleObligatorioFuncional()) {
      this.addMensaje('La tarea no pudo finalizar. Verifique los campos obligatorios funcionales.');
      return;
    }

    this.guardarFormulario();

    if (this.simularErrorEnvioMail) {
      this.visualizarPopupErrorEnvioMail([
        'No se ha podido enviar el correo principal.',
        'Revise la configuracion de envio y vuelva a intentar.',
      ]);
      return;
    }

    this.continuarProcesoTerminarFormulario();
  }

  public continuarProcesoTerminarFormulario(): void {
    this.mensajePostTerminacionTarea =
      'La tarea fue finalizada correctamente y el flujo se inicio con exito.';
    this.popupMensajePostTerminacionTareaVisible = true;
    this.addMensaje('Tarea finalizada.');
  }

  public visualizarPopupErrorEnvioMail(mensajesMail: string[]): void {
    this.mensajeNoEnvioMail = mensajesMail.join('\n');
    this.popupMensajeVisualizarErroresEnvioMailVisible = true;
  }

  public continuarPopupMensajeVisualizarErroresEnvioMail(): void {
    this.mensajeNoEnvioMail = '';
    this.popupMensajeVisualizarErroresEnvioMailVisible = false;
    this.continuarProcesoTerminarFormulario();
  }

  public cancelarPopupMensajeVisualizarErroresEnvioMail(): void {
    this.mensajeNoEnvioMail = '';
    this.popupMensajeVisualizarErroresEnvioMailVisible = false;
    this.addMensaje('Finalizacion cancelada por el usuario.');
  }

  public cerrarPopUpMensajePostTerminacionTarea(): void {
    this.mensajePostTerminacionTarea = '';
    this.popupMensajePostTerminacionTareaVisible = false;
  }

  public ejecutarAccionComponente(componente: ComponenteBaseEntity): void {
    if (this.asBool(componente.saveButtonType)) {
      this.guardarFormulario();
      return;
    }

    if (this.asBool(componente.searchButtonType)) {
      this.addMensaje(`Consulta ejecutada para ${componente.nombre}.`);
      return;
    }

    if (this.asBool(componente.refreshButtonType)) {
      this.refrescarPagina();
      return;
    }

    if (this.asBool(componente.linkToAFormType)) {
      this.addMensaje(`Apertura de formulario asociada a ${componente.nombre}.`);
      return;
    }

    if (this.hasComponentFlag(componente, 'linkToDifferentFormType')) {
      this.addMensaje(`Apertura de formulario diferente desde ${componente.nombre}.`);
      return;
    }

    if (this.asBool(componente.linkFormToIfacesType)) {
      this.addMensaje(`Invocacion ICEFaces enlazada desde ${componente.nombre}.`);
    }
  }

  private preprocesarDatosTerminacion(): void {
    this.valoresComponentes = {};

    for (const seccion of this.secciones) {
      for (const componente of this.getComponentList(seccion.componentesIzq)) {
        this.seedValorComponente(componente);
      }
      for (const componente of this.getComponentList(seccion.componentesCent)) {
        this.seedValorComponente(componente);
      }
      for (const componente of this.getComponentList(seccion.componentesDer)) {
        this.seedValorComponente(componente);
      }
    }
  }

  private isCumpleObligatorioFuncional(): boolean {
    let esValido = true;

    for (const seccion of this.secciones) {
      const componentes = [
        ...this.getComponentList(seccion.componentesIzq),
        ...this.getComponentList(seccion.componentesCent),
        ...this.getComponentList(seccion.componentesDer),
      ];

      for (const componente of componentes) {
        if (!this.asBool(componente.visible) || !this.asBool(componente.obligatorioFuncional)) {
          continue;
        }

        const valor = this.getComponentValue(componente);
        const vacio = valor === '' || valor === false || valor === null || valor === undefined;
        if (vacio) {
          this.addMensaje(`El campo: '${componente.nombre}' es obligatorio.`);
          esValido = false;
        }
      }
    }

    return esValido;
  }

  private seedComponentValues(): void {
    for (const seccion of this.secciones) {
      for (const componente of this.getComponentList(seccion.componentesIzq)) {
        this.seedComponente(componente);
      }
      for (const componente of this.getComponentList(seccion.componentesCent)) {
        this.seedComponente(componente);
      }
      for (const componente of this.getComponentList(seccion.componentesDer)) {
        this.seedComponente(componente);
      }
    }
  }

  private seedComponente(componente: ComponenteBaseEntity): void {
    const key = this.componentKey(componente);
    if (key in this.componentValues) {
      return;
    }

    const defaultValue = getFieldPayloadValue(componente.valor);
    if (this.asBool(componente.checkBoxType)) {
      this.componentValues[key] = defaultValue === true || defaultValue === 'true';
      return;
    }

    this.componentValues[key] = defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : '';
  }

  private seedValorComponente(componente: ComponenteBaseEntity): void {
    if (!componente.nombre) {
      return;
    }

    const valor = this.getComponentValue(componente);
    this.valoresComponentes[componente.nombre] = valor !== null && valor !== undefined ? String(valor) : '';
  }

  private createComponent(partial: {
    id: string;
    nombre: string;
    tipoComponente: string;
    valor?: string;
    items?: Array<{ label: string; value: string }>;
    obligatorio?: 'true' | 'false';
    obligatorioFuncional?: 'true' | 'false';
    textType?: 'true';
    textAreaType?: 'true';
    dateType?: 'true';
    checkBoxType?: 'true';
    listBoxType?: 'true';
    radioButtonType?: 'true';
    labelType?: 'true';
    linkType?: 'true';
    cargaMasivaType?: 'true';
    mailType?: 'true';
    saveButtonType?: 'true';
    searchButtonType?: 'true';
    refreshButtonType?: 'true';
  }): ComponenteBaseEntity {
    return {
      cambiado: 'false',
      observadores: '',
      id: partial.id,
      nombre: partial.nombre,
      tipoDato: 'string',
      tipoComponente: partial.tipoComponente,
      descripcion: partial.nombre,
      valor: { class: 'java.lang.String', value: partial.valor ?? '' },
      ultimoId: '0',
      obligatorio: partial.obligatorio ?? 'false',
      obligatorioFuncional: partial.obligatorioFuncional ?? 'false',
      readOnly: 'false',
      guardado: 'false',
      cumpleValidaciones: 'true',
      opcionExtra: 'false',
      integerType: 'false',
      textType: partial.textType ?? 'false',
      dateType: partial.dateType ?? 'false',
      separadorType: 'false',
      checkBoxType: partial.checkBoxType ?? 'false',
      textAreaType: partial.textAreaType ?? 'false',
      listBoxType: partial.listBoxType ?? 'false',
      listBoxCustomizedType: 'false',
      radioButtonType: partial.radioButtonType ?? 'false',
      listCompuestaType: 'false',
      grillaType: 'false',
      labelType: partial.labelType ?? 'false',
      cargaMasivaType: partial.cargaMasivaType ?? 'false',
      mailType: partial.mailType ?? 'false',
      searchButtonType: partial.searchButtonType ?? 'false',
      refreshButtonType: partial.refreshButtonType ?? 'false',
      saveButtonType: partial.saveButtonType ?? 'false',
      linkType: partial.linkType ?? 'false',
      linkToAFormType: 'false',
      linkFormToIfacesType: 'false',
      validacionesExpresiones: '',
      style: '',
      styleClass: '',
      styleContenedor: '',
      styleClassContenedor: '',
      columnClasses: 'columnaAlineacionVertical1,columnaAlineacionVertical2',
      claseEstilo: '',
      visible: 'true',
      filtro: 'false',
      relacionObservadorColumna: '',
      tablaDetalleType: 'false',
      richTextType: 'false',
      estaSujeto: 'false',
      esOrigenValidacion: 'false',
      componentesRelacionados: '',
      componentesNuevaValidacionEntreComponentes: '',
      arbolesExpresionNuevaValidacionEntreComponentes: '',
      operadorAritmetico: '',
      items: partial.items,
    };
  }
}
