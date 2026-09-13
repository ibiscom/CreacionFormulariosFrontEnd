import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponenteBaseEntity } from '../../../entidades/forms-captura/componente-base.entity';
import { ComponentesEntity } from '../../../entidades/forms-captura/componentes.entity';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { SeccionEntity } from '../../../entidades/forms-captura/seccion.entity';
import { SelectItemEntity } from '../../../entidades/forms-captura/select-item.entity';
import { DialogAyudaComponent } from '../../captura/plantilla-form-captura/dialog-ayuda/dialog-ayuda.component';
import { MatDialog } from '@angular/material/dialog';
import { PlantillaFormCapturaComponent } from '../../captura/plantilla-form-captura/plantilla-form-captura.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantillaFormCapturaService } from '../../captura/plantilla-form-captura/plantilla-form-captura.service';
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../utilidades/field-value.util';
import { SeccionComponent } from '../../captura/plantilla-form-captura/seccion/seccion.component';
import { PlantillaFormularioNormalHtmService } from './plantilla-formulario-normal-htm.service';

@Component({
  selector: 'htm-plantilla-formulario-normal-htm',
  imports: [FormsModule, SeccionComponent],
  templateUrl: './plantilla-formulario-normal-htm.component.html',
  styleUrl: './plantilla-formulario-normal-htm.component.scss',
})
export class PlantillaFormularioNormalHtmComponent extends PlantillaFormCapturaComponent {
  @Input() public padre?: any;

  @Input() public set formularioInput(value: FormularioJSONEntity | undefined) {
    if (!value) {
      return;
    }

    this.formulario = value;
    this.seedComponentValues();
  }

  //TODO Nota: Quitar override y definir el formulario directamente en el componente si no se requiere la flexibilidad de recibirlo por input.
  public override formulario: FormularioJSONEntity = {
    titulo: 'Formulario Normal HTM',
    descripcion: 'Migracion Angular equivalente de plantillaFormularioNormalHTM.jspx.',
    seccionesFormulario: {
      Seccion_1: {
        titulo: 'Informacion general',
        descripcion: 'Campos de ejemplo para la migracion del formulario normal.',
        guardado: 'false',
        expandido: 'true',
        componentesIzq: {
          inputNombre: this.createComponent({
            id: 'inputNombre',
            nombre: 'Nombre completo',
            tipoComponente: 'InPutText',
            textType: 'true',
            obligatorio: 'true',
            valor: 'Usuario demo',
          }),
          inputDescripcion: this.createComponent({
            id: 'inputDescripcion',
            nombre: 'Descripcion',
            tipoComponente: 'InPutTextArea',
            textAreaType: 'true',
            valor: 'Observaciones iniciales.',
          }),
          fechaSolicitud: this.createComponent({
            id: 'fechaSolicitud',
            nombre: 'Fecha solicitud',
            tipoComponente: 'SelectInPutDate',
            dateType: 'true',
            valor: '2026-05-30',
          }),
          tipoSolicitud: this.createComponent({
            id: 'tipoSolicitud',
            nombre: 'Tipo solicitud',
            tipoComponente: 'SelectOneListBox',
            listBoxType: 'true',
            obligatorioFuncional: 'true',
            valor: 'consulta',
            items: [
              { label: 'Seleccione', value: '' },
              { label: 'Consulta', value: 'consulta' },
              { label: 'Actualizacion', value: 'actualizacion' },
            ],
          }),
          habilitado: this.createComponent({
            id: 'habilitado',
            nombre: 'Habilitado',
            tipoComponente: 'SelectBooleanCheckBox',
            checkBoxType: 'true',
            valor: 'true',
          }),
        },
        componentesCent: {
          enlaceManual: this.createComponent({
            id: 'enlaceManual',
            nombre: 'Manual del proceso',
            tipoComponente: 'OutPutLink',
            linkType: 'true',
            valor: 'https://example.com/manual',
          }),
          etiquetaInfo: this.createComponent({
            id: 'etiquetaInfo',
            nombre: 'Informacion',
            tipoComponente: 'Label',
            labelType: 'true',
            valor: 'Formulario equivalente migrado desde JSF/IceFaces.',
          }),
        },
        componentesDer: {
          radioPrioridad: [
            this.createComponent({
              id: 'radioPrioridadAlta',
              nombre: 'Prioridad',
              tipoComponente: 'SelectOneRadioButton',
              radioButtonType: 'true',
              valor: 'alta',
              items: [
                { label: 'Alta', value: 'alta' },
                { label: 'Media', value: 'media' },
                { label: 'Baja', value: 'baja' },
              ],
            }),
          ],
          archivoAdjunto: this.createComponent({
            id: 'archivoAdjunto',
            nombre: 'Adjunto',
            tipoComponente: 'CargaMasiva',
            cargaMasivaType: 'true',
          }),
        },
      },
    },
    entidades: {},
    entidadPrincipal: '',
    entidadesRelacionadas: {},
    idFormularioPadre: 'vacio',
    nuevo: 'true',
    edicion: 'true',
    eliminable: 'true',
    diligenciable: 'true',
    consultable: 'true',
    plantillasMostrables: 'true',
    htmlAyuda:
      '<p>Ayuda del formulario normal migrada.</p><p>Puede sustituirse por el contenido HTML enviado por backend.</p>',
  };

  public override mensajes: string[] = [];
  public componentValues: Record<string, string | boolean> = {};

  public override clicksGuardar = 0;

  public override mostrarFormulario = true;
  public diligenciable = true;
  public override hayAnteriorFormulario = true;
  public override mostrarBotonNuevo = true;
  public override mostrarBotonEdicion = true;
  public override mostrarBotonEliminar = true;

  public override hayCartas = true;
  public override mostrarCartas = true;
  public override cartaSeleccionada = 'cartaA';
  public override tipoHoja = 'letter';

  public override hayRecurso = true;
  public override hayRecursoWord = true;
  public override hayComponentesMail = true;
  public override firmable = true;

  public override nombreCarta = 'plantilla-demo';
  public override recursoPdfUrl = '#';
  public override recursoWordUrl = '#';
  public override idMailSeleccionado = 'mail1';
  public override componentesMail = [
    { label: 'Correo principal', value: 'mail1' },
    { label: 'Correo secundario', value: 'mail2' },
  ];

  public override popupFirmaVisible = false;
  public override urlPopupFirma = 'about:blank';

  public constructor(
    dialog: MatDialog,
    protected override plantillaFormCapturaService: PlantillaFormCapturaService,
    protected override route: ActivatedRoute,
    protected override router: Router,
    protected plantillaFormularioNormalHtmService: PlantillaFormularioNormalHtmService,
  ) {
    super(plantillaFormCapturaService, route, router, dialog);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.seedComponentValues();
  }

  public get secciones(): SeccionEntity[] {
    return Object.values(this.formulario.seccionesFormulario);
  }

  public hasComponentFlag(componente: ComponenteBaseEntity, flagName: string): boolean {
    return this.asBool((componente as unknown as Record<string, unknown>)[flagName]);
  }

  public toggleSeccion(seccion: SeccionEntity): void {
    seccion.expandido = this.asBool(seccion.expandido) ? 'false' : 'true';
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

  public getComponentValueAsString(componente: ComponenteBaseEntity): string {
    return String(this.getComponentValue(componente));
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
        value:
          typeof rawValue === 'object' && rawValue
            ? String(rawValue.value ?? '')
            : String(rawValue ?? ''),
      };
    });
  }

  public getMostrarAsteriscoRojo(componente: ComponenteBaseEntity): boolean {
    return (
      this.asBool(componente.obligatorio) ||
      (this.hayAnteriorFormulario && this.asBool(componente.obligatorioFuncional))
    );
  }

  public getMostrarAsteriscoVerde(componente: ComponenteBaseEntity): boolean {
    return this.asBool(componente.obligatorioFuncional) && !this.hayAnteriorFormulario;
  }

  public override addMensaje(message: string): void {
    this.mensajes = [message, ...this.mensajes].slice(0, 5);
  }

  public override abrirVentanaAyuda(): void {
    const dialogRef = this.dialog.open(DialogAyudaComponent, {
      width: '400px',
      data: {
        nombreFormulario: this.formulario?.titulo || 'Formulario',
        contenidoAyuda: this.formulario?.htmlAyuda || '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.debug('Diálogo de ayuda cerrado', result);
    });
  }

  public override guardarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }
    1;
    this.plantillaFormularioNormalHtmService.guardarFormularioNormalHTM(this.formulario).subscribe({
      next: (response) => {
        if (response) {
          this.addMensaje('Formulario guardado exitósamente.');
        }
      },
      error: (error) => {
        this.addMensaje(
          'Error al guardar el formulario: ' + (error?.message || 'Error desconocido'),
        );
      },
    });
  }

  public override editarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.plantillaFormularioNormalHtmService.editarFormularioNormalHTM(this.formulario).subscribe({
      next: (response) => {
        if (response) {
          this.addMensaje('Formulario editado correctamente.');
        }
      },
      error: (error) => {
        this.addMensaje(
          'Error al editar el formulario: ' + (error?.message || 'Error desconocido'),
        );
      },
    });
  }

  public override eliminarRegistro(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.plantillaFormularioNormalHtmService
      .eliminarRegistroFormularioNormalHTM(this.formulario)
      .subscribe({
        next: (response) => {
          if (response) {
            this.addMensaje('Registro eliminado correctamente.');
          }
        },
        error: (error) => {
          this.addMensaje(
            'Error al eliminar el registro: ' + (error?.message || 'Error desconocido'),
          );
        },
      });
  }

  public override nuevoRegistro(): void {
    this.componentValues = {};
    this.seedComponentValues();
    this.resetPrevencionDobleClic();
    this.addMensaje('Formulario limpiado.');
  }

  public override refrescarPagina(): void {
    this.resetPrevencionDobleClic();
    this.addMensaje('Pagina refrescada.');
  }

  public override regresarAnteriorFormulario(): void {
    this.addMensaje('Navegacion al formulario anterior.');
  }

  public override generarPlantilla(): void {
    this.hayRecurso = true;
    this.hayRecursoWord = true;
    this.addMensaje(`Plantilla generada en formato ${this.tipoHoja}.`);
  }

  public adjuntarPlantillaPDF(): void {
    if (!this.hayRecurso) {
      this.addMensaje(
        'No se permite anexar el documento al proceso. No se ha generado el archivo digital.',
      );
      return;
    }

    this.addMensaje('Se anexo correctamente la planilla.');
  }

  public override adjuntarPlantillaMail(): void {
    this.addMensaje(`Carta adjuntada al envio de correo ${this.idMailSeleccionado}.`);
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

    this.componentValues[key] =
      defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : '';
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
      mailType: 'false',
      searchButtonType: 'false',
      refreshButtonType: 'false',
      saveButtonType: 'false',
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

  ngAfterViewChecked(): void {
    this.padre?.refrescarAltura?.();
  }
}
