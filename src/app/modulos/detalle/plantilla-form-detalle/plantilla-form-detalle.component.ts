import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponenteBaseEntity } from '../../../entidades/forms-captura/componente-base.entity';
import { ComponentesEntity } from '../../../entidades/forms-captura/componentes.entity';
import { FormularioJSONEntity } from '../../../entidades/forms-captura/formulario-json.entity';
import { SeccionEntity } from '../../../entidades/forms-captura/seccion.entity';
import { SelectItemEntity } from '../../../entidades/forms-captura/select-item.entity';
import { getFieldPayloadValue, setFieldPayloadValue } from '../../../utilidades/field-value.util';
import { CargaMasivaComponent } from '../../captura/plantilla-form-captura/carga-masiva/carga-masiva.component';
import { InPutRichTextComponent } from '../../captura/plantilla-form-captura/in-put-rich-text/in-put-rich-text.component';
import { InPutTextAreaComponent } from '../../captura/plantilla-form-captura/in-put-text-area/in-put-text-area.component';
import { InPutTextComponent } from '../../captura/plantilla-form-captura/in-put-text/in-put-text.component';
import { LabelComponent } from '../../captura/plantilla-form-captura/label/label.component';
import { LinkFormToIcefacesComponent } from '../../captura/plantilla-form-captura/link-form-to-icefaces/link-form-to-icefaces.component';
import { LinkToAFormComponent } from '../../captura/plantilla-form-captura/link-to-a-form/link-to-a-form.component';
import { LinkToDifferentFormComponent } from '../../captura/plantilla-form-captura/link-to-different-form/link-to-different-form.component';
import { ListaCompuestaComponent } from '../../captura/plantilla-form-captura/lista-compuesta/lista-compuesta.component';
import { MailComponent } from '../../captura/plantilla-form-captura/mail/mail.component';
import { OutPutLinkComponent } from '../../captura/plantilla-form-captura/out-put-link/out-put-link.component';
import { RefreshButtonComponent } from '../../captura/plantilla-form-captura/refresh-button/refresh-button.component';
import { SaveButtonComponent } from '../../captura/plantilla-form-captura/save-button/save-button.component';
import { SearchButtonComponent } from '../../captura/plantilla-form-captura/search-button/search-button.component';
import { SelectBooleanCheckBoxComponent } from '../../captura/plantilla-form-captura/select-boolean-check-box/select-boolean-check-box.component';
import { SelectInPutDateComponent } from '../../captura/plantilla-form-captura/select-in-put-date/select-in-put-date.component';
import { SelectOneListBoxCustomizedComponent } from '../../captura/plantilla-form-captura/select-one-list-box-customized/select-one-list-box-customized.component';
import { SelectOneListBoxComponent } from '../../captura/plantilla-form-captura/select-one-list-box/select-one-list-box.component';
import { SelectOneRadioComponent } from '../../captura/plantilla-form-captura/select-one-radio/select-one-radio.component';
import { TableDetailsComponent } from '../../captura/plantilla-form-captura/table-details/table-details.component';

@Component({
  selector: 'app-plantilla-form-detalle',
  imports: [
    CommonModule,
    FormsModule,
    InPutTextComponent,
    InPutTextAreaComponent,
    SelectInPutDateComponent,
    SelectOneListBoxComponent,
    SelectOneListBoxCustomizedComponent,
    SelectBooleanCheckBoxComponent,
    SelectOneRadioComponent,
    CargaMasivaComponent,
    LabelComponent,
    OutPutLinkComponent,
    LinkToAFormComponent,
    LinkToDifferentFormComponent,
    LinkFormToIcefacesComponent,
    SaveButtonComponent,
    SearchButtonComponent,
    RefreshButtonComponent,
    MailComponent,
    ListaCompuestaComponent,
    InPutRichTextComponent,
    TableDetailsComponent,
  ],
  templateUrl: './plantilla-form-detalle.component.html',
  styleUrl: './plantilla-form-detalle.component.scss',
})
export class PlantillaFormDetalleComponent {
  @Input() public set formularioInput(value: FormularioJSONEntity | undefined) {
    if (!value) {
      return;
    }

    this.formulario = value;
    this.seedComponentValues();
  }

  public formulario: FormularioJSONEntity = {
    titulo: 'Formulario detalle',
    descripcion: 'Versión Angular equivalente del formulario detalle JSF/IceFaces.',
    seccionesFormulario: {
      Seccion_1: {
        titulo: 'Detalle general',
        descripcion: 'Sección principal del detalle con captura, tablas y recursos.',
        guardado: 'false',
        expandido: 'true',
        componentesIzq: {
          numeroSolicitud: this.createComponent({
            id: 'numeroSolicitud',
            nombre: 'Número solicitud',
            tipoComponente: 'InPutText',
            textType: 'true',
            obligatorio: 'true',
            valor: 'DET-1001',
          }),
          fechaRegistro: this.createComponent({
            id: 'fechaRegistro',
            nombre: 'Fecha registro',
            tipoComponente: 'SelectInPutDate',
            dateType: 'true',
            valor: '2026-06-30',
          }),
          tipoDetalle: this.createComponent({
            id: 'tipoDetalle',
            nombre: 'Tipo detalle',
            tipoComponente: 'SelectOneListBox',
            listBoxType: 'true',
            valor: 'operativo',
            items: [
              { label: 'Seleccione', value: '' },
              { label: 'Operativo', value: 'operativo' },
              { label: 'Financiero', value: 'financiero' },
              { label: 'Legal', value: 'legal' },
            ],
          }),
          observacion: this.createComponent({
            id: 'observacion',
            nombre: 'Observación',
            tipoComponente: 'InPutTextArea',
            textAreaType: 'true',
            valor: 'Observaciones iniciales del detalle.',
          }),
          activo: this.createComponent({
            id: 'activo',
            nombre: 'Activo',
            tipoComponente: 'SelectBooleanCheckBox',
            checkBoxType: 'true',
            valor: 'true',
          }),
        },
        componentesCent: {
          resumen: this.createComponent({
            id: 'resumen',
            nombre: 'Resumen descriptivo',
            tipoComponente: 'InPutRichText',
            richTextType: 'true',
            valor:
              '<p>Resumen editable del detalle.</p><p>Este bloque representa el contenido enriquecido del JSPX.</p>',
            style: 'min-height:220px;width:100%;',
          }),
          historial: this.createComponent({
            id: 'historial',
            nombre: 'Historial relacionado',
            tipoComponente: 'ListaCompuesta',
            listCompuestaType: 'true',
            textoHTMLTabla: this.createListaCompuestaHtml(),
            styleContenedor: 'width:100%;',
          }),
          informacion: this.createComponent({
            id: 'informacion',
            nombre: 'Información',
            tipoComponente: 'Label',
            labelType: 'true',
            valor: 'La sección detalle admite acciones de agregar, edición, recursos PDF/Word y navegación.',
          }),
        },
        componentesDer: {
          tablaItems: this.createComponent({
            id: 'tablaItems',
            nombre: 'Ítems del detalle',
            tipoComponente: 'TablaDetalle',
            tablaDetalleType: 'true',
            nombresOrganizados: '["Concepto","Cantidad","Estado"]',
            columnas: [
              { valores: ['Servicio A', '2', 'Pendiente'] },
              { valores: ['Servicio B', '1', 'Aprobado'] },
            ],
            mostrarBotonBuscar: 'true',
            pagSize: '5',
            styleContenedor: 'width:100%;',
          }),
          archivoAdjunto: this.createComponent({
            id: 'archivoAdjunto',
            nombre: 'Adjunto',
            tipoComponente: 'CargaMasiva',
            cargaMasivaType: 'true',
          }),
          correo: this.createComponent({
            id: 'correo',
            nombre: 'Correo asociado',
            tipoComponente: 'Mail',
            mailType: 'true',
            valor: 'false',
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
      '<p>Ayuda del formulario detalle migrada.</p><p>Aquí puede mostrarse la ayuda HTML enviada por backend.</p>',
  };

  public mensajes: string[] = [];
  public componentValues: Record<string, string | boolean> = {};
  public clicksGuardar = 0;

  public mostrarFormulario = true;
  public mostrarBotonNuevo = true;
  public mostrarBotonEdicion = true;
  public mostrarBotonEliminar = true;
  public hayAnteriorFormulario = true;
  public tablaDetalleEnEdicion = false;

  public hayCartas = true;
  public mostrarCartas = true;
  public hayRecurso = true;
  public hayRecursoWord = true;
  public firmable = true;
  public hayComponentesMail = true;

  public cartaSeleccionada = 'detalleBase';
  public tipoHoja = 'letter';
  public recursoPdfUrl = '#';
  public recursoWordUrl = '#';
  public nombreCarta = 'detalle-demo';
  public idMailSeleccionado = 'mail1';
  public componentesMail = [
    { label: 'Correo principal', value: 'mail1' },
    { label: 'Correo secundario', value: 'mail2' },
  ];

  public popupFirmaVisible = false;
  public ventanaAyudaVisible = false;
  public urlPopupFirma = 'about:blank';

  public ngOnInit(): void {
    this.seedComponentValues();
  }

  public get secciones(): SeccionEntity[] {
    return Object.values(this.formulario.seccionesFormulario);
  }

  public toggleSeccion(seccion: SeccionEntity): void {
    seccion.expandido = this.asBool(seccion.expandido) ? 'false' : 'true';
  }

  public asBool(value: unknown): boolean {
    return value === true || value === 'true';
  }

  public hasComponentFlag(componente: ComponenteBaseEntity, flagName: string): boolean {
    return this.asBool((componente as unknown as Record<string, unknown>)[flagName]);
  }

  public getComponentList(componentes: ComponentesEntity | ''): ComponenteBaseEntity[] {
    if (componentes === '') {
      return [];
    }

    const values = Object.values(componentes);
    return values.flatMap((entry) => (Array.isArray(entry) ? entry : entry ? [entry] : []));
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

  public getComponentValueAsString(componente: ComponenteBaseEntity): string {
    return String(this.getComponentValue(componente));
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
    return this.asBool(componente.obligatorio) || this.asBool(componente.obligatorioFuncional);
  }

  public addMensaje(message: string): void {
    this.mensajes = [message, ...this.mensajes].slice(0, 5);
  }

  public abrirVentanaAyuda(): void {
    this.ventanaAyudaVisible = true;
  }

  public cerrarVentanaAyuda(): void {
    this.ventanaAyudaVisible = false;
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

  public agregarDetalle(): void {
    this.tablaDetalleEnEdicion = true;
    this.addMensaje('Detalle agregado en edición local.');
  }

  public guardarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.tablaDetalleEnEdicion = false;
    this.addMensaje('Registro guardado.');
  }

  public editarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.tablaDetalleEnEdicion = false;
    this.addMensaje('Registro actualizado.');
  }

  public eliminarRegistro(): void {
    this.tablaDetalleEnEdicion = false;
    this.addMensaje('Registro cancelado o eliminado.');
  }

  public nuevoRegistro(): void {
    this.componentValues = {};
    this.seedComponentValues();
    this.resetPrevencionDobleClic();
    this.tablaDetalleEnEdicion = false;
    this.addMensaje('Campos reiniciados.');
  }

  public refrescarPagina(): void {
    this.resetPrevencionDobleClic();
    this.addMensaje('Página refrescada.');
  }

  public regresarAnteriorFormulario(): void {
    this.addMensaje('Regreso al formulario anterior.');
  }

  public generarPlantilla(): void {
    this.hayRecurso = true;
    this.hayRecursoWord = true;
    this.addMensaje(`Plantilla generada para ${this.cartaSeleccionada} en formato ${this.tipoHoja}.`);
  }

  public adjuntarPlantillaPDF(): void {
    this.addMensaje('PDF anexado al contexto del detalle.');
  }

  public seleccionarMail(value: string): void {
    this.idMailSeleccionado = value;
    this.addMensaje(`Correo seleccionado: ${value}.`);
  }

  public adjuntarPlantillaMail(): void {
    this.addMensaje(`Plantilla adjuntada al correo ${this.idMailSeleccionado}.`);
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

  private createListaCompuestaHtml(): string {
    return [
      '<table>',
      '<tr><th>Fecha</th><th>Acción</th><th>Usuario</th></tr>',
      '<tr><td>2026-06-28</td><td>Creación</td><td>analista</td></tr>',
      '<tr><td>2026-06-29</td><td>Edición</td><td>coordinador</td></tr>',
      '</table>',
    ].join('');
  }

  private createComponent(
    partial: {
      id: string;
      nombre: string;
      tipoComponente: string;
      valor?: string;
      items?: Array<{ label: string; value: string }>;
      obligatorio?: 'true' | 'false';
      textType?: 'true';
      textAreaType?: 'true';
      dateType?: 'true';
      checkBoxType?: 'true';
      listBoxType?: 'true';
      richTextType?: 'true';
      listCompuestaType?: 'true';
      tablaDetalleType?: 'true';
      cargaMasivaType?: 'true';
      labelType?: 'true';
      mailType?: 'true';
      style?: string;
      styleContenedor?: string;
      textoHTMLTabla?: string;
      nombresOrganizados?: string;
      columnas?: Array<{ valores: string[] }>;
      mostrarBotonBuscar?: string;
      pagSize?: string;
    } & Record<string, unknown>,
  ): ComponenteBaseEntity {
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
      obligatorioFuncional: 'false',
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
      radioButtonType: 'false',
      listCompuestaType: partial.listCompuestaType ?? 'false',
      grillaType: 'false',
      labelType: partial.labelType ?? 'false',
      cargaMasivaType: partial.cargaMasivaType ?? 'false',
      mailType: partial.mailType ?? 'false',
      searchButtonType: 'false',
      refreshButtonType: 'false',
      saveButtonType: 'false',
      linkType: 'false',
      linkToAFormType: 'false',
      linkFormToIfacesType: 'false',
      validacionesExpresiones: '',
      style: partial.style ?? '',
      styleClass: '',
      styleContenedor: partial.styleContenedor ?? '',
      styleClassContenedor: '',
      columnClasses: 'columnaAlineacionVertical1,columnaAlineacionVertical2',
      claseEstilo: '',
      visible: 'true',
      filtro: 'false',
      relacionObservadorColumna: '',
      tablaDetalleType: partial.tablaDetalleType ?? 'false',
      richTextType: partial.richTextType ?? 'false',
      estaSujeto: 'false',
      esOrigenValidacion: 'false',
      componentesRelacionados: '',
      componentesNuevaValidacionEntreComponentes: '',
      arbolesExpresionNuevaValidacionEntreComponentes: '',
      operadorAritmetico: '',
      items: partial.items,
      textoHTMLTabla: partial.textoHTMLTabla,
      nombresOrganizados: partial.nombresOrganizados as unknown as { [key: string]: string },
      columnas: partial.columnas,
      mostrarBotonBuscar: partial.mostrarBotonBuscar,
      pagSize: partial.pagSize,
    } as ComponenteBaseEntity;
  }

}
