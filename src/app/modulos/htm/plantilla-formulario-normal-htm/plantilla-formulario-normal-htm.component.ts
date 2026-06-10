import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponenteBaseEntity } from '../../../entidades/forms-captura/componente-base.entity';
import { ComponentesEntity } from '../../../entidades/forms-captura/componentes.entity';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { SeccionEntity } from '../../../entidades/forms-captura/seccion.entity';
import { SelectItemEntity } from '../../../entidades/forms-captura/select-item.entity';
import { DialogAyudaComponent } from '../../captura/plantilla-form-captura/dialog-ayuda/dialog-ayuda.component';
import { MatDialog } from '@angular/material/dialog';
import { InPutTextComponent } from "../../captura/plantilla-form-captura/in-put-text/in-put-text.component";
import { PlantillaFormCapturaComponent } from '../../captura/plantilla-form-captura/plantilla-form-captura.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantillaFormCapturaService } from '../../captura/plantilla-form-captura/plantilla-form-captura.service';
import { InPutTextAreaComponent } from "../../captura/plantilla-form-captura/in-put-text-area/in-put-text-area.component";
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../utilidades/field-value.util';
import { SelectInPutDateComponent } from "../../captura/plantilla-form-captura/select-in-put-date/select-in-put-date.component";
import { CargaMasivaComponent } from '../../captura/plantilla-form-captura/carga-masiva/carga-masiva.component';
import { LabelComponent } from '../../captura/plantilla-form-captura/label/label.component';
import { OutPutLinkComponent } from '../../captura/plantilla-form-captura/out-put-link/out-put-link.component';
import { SelectBooleanCheckBoxComponent } from '../../captura/plantilla-form-captura/select-boolean-check-box/select-boolean-check-box.component';
import { SelectOneListBoxComponent } from '../../captura/plantilla-form-captura/select-one-list-box/select-one-list-box.component';
import { SelectOneRadioComponent } from "../../captura/plantilla-form-captura/select-one-radio/select-one-radio.component";
import { SelectOneListBoxCustomizedComponent } from '../../captura/plantilla-form-captura/select-one-list-box-customized/select-one-list-box-customized.component';
import { LinkToAFormComponent } from "../../captura/plantilla-form-captura/link-to-a-form/link-to-a-form.component";
import { SearchButtonComponent } from '../../captura/plantilla-form-captura/search-button/search-button.component';
import { SaveButtonComponent } from '../../captura/plantilla-form-captura/save-button/save-button.component';
import { RefreshButtonComponent } from '../../captura/plantilla-form-captura/refresh-button/refresh-button.component';
import { MailComponent } from '../../captura/plantilla-form-captura/mail/mail.component';
import { LinkToDifferentFormComponent } from '../../captura/plantilla-form-captura/link-to-different-form/link-to-different-form.component';
import { LinkFormToIcefacesComponent } from '../../captura/plantilla-form-captura/link-form-to-icefaces/link-form-to-icefaces.component';

@Component({
  selector: 'htm-plantilla-formulario-normal-htm',
  imports: [CommonModule, FormsModule, InPutTextComponent,  InPutTextAreaComponent, SelectInPutDateComponent, SelectOneListBoxComponent, SelectBooleanCheckBoxComponent, OutPutLinkComponent, LabelComponent, CargaMasivaComponent, SelectOneRadioComponent, SelectOneListBoxCustomizedComponent, LinkToAFormComponent, RefreshButtonComponent, MailComponent, LinkToDifferentFormComponent, SaveButtonComponent, LinkFormToIcefacesComponent, LinkToDifferentFormComponent, SearchButtonComponent],
  templateUrl: './plantilla-formulario-normal-htm.component.html',
  styleUrl: './plantilla-formulario-normal-htm.component.scss',
})
export class PlantillaFormularioNormalHtmComponent extends PlantillaFormCapturaComponent {
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

  public mensajes: string[] = [];
  public componentValues: Record<string, string | boolean> = {};

  public clicksGuardar = 0;

  public mostrarFormulario = true;
  public diligenciable = true;
  public hayAnteriorFormulario = true;
  public mostrarBotonNuevo = true;
  public mostrarBotonEdicion = true;
  public mostrarBotonEliminar = true;

  public hayCartas = true;
  public mostrarCartas = true;
  public cartaSeleccionada = 'cartaA';
  public tipoHoja = 'letter';

  public hayRecurso = true;
  public hayRecursoWord = true;
  public hayComponentesMail = true;
  public firmable = true;

  public nombreCarta = 'plantilla-demo';
  public recursoPdfUrl = '#';
  public recursoWordUrl = '#';
  public idMailSeleccionado = 'mail1';
  public componentesMail = [
    { label: 'Correo principal', value: 'mail1' },
    { label: 'Correo secundario', value: 'mail2' },
  ];

  public popupFirmaVisible = false;
  public urlPopupFirma = 'about:blank';

  public constructor(
    public dialog: MatDialog,
    protected override plantillaFormCapturaService: PlantillaFormCapturaService,
    protected override route: ActivatedRoute,
    protected override router: Router,
  ) {
    super( plantillaFormCapturaService, route, router);
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
    this.mensajes = [message, ...this.mensajes].slice(0, 5);
  }

  public abrirVentanaAyuda(): void {
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

    this.addMensaje('Formulario guardado y trazabilidad local actualizada.');
  }

  public editarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.addMensaje('Registro editado correctamente.');
  }

  public eliminarRegistro(): void {
    this.addMensaje('Registro eliminado.');
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

    this.componentValues[key] = defaultValue !== undefined && defaultValue !== null ? String(defaultValue) : '';
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

}
