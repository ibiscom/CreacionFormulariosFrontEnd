import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  selector: 'app-plantilla-formulario-detalle-normal-htm',
  standalone: true,
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
  templateUrl: './plantilla-formulario-detalle-normal-htm.component.html',
  styleUrl: './plantilla-formulario-detalle-normal-htm.component.scss',
})
export class PlantillaFormularioDetalleNormalHtmComponent {
  public formulario: FormularioJSONEntity = {
    titulo: 'Formulario detalle normal HTM',
    descripcion: 'Versión Angular equivalente de plantillaFormularioDetalleNormalHTM.jspx.',
    seccionesFormulario: {
      Seccion_1: {
        titulo: 'Detalle de la solicitud',
        descripcion: 'Captura y edición del detalle con recursos y trazabilidad.',
        guardado: 'false',
        expandido: 'true',
        componentesIzq: {
          numeroSolicitud: this.createComponent({
            id: 'numeroSolicitud',
            nombre: 'Número solicitud',
            tipoComponente: 'InPutText',
            textType: 'true',
            obligatorio: 'true',
            valor: 'DET-HTM-3001',
          }),
          fechaRegistro: this.createComponent({
            id: 'fechaRegistro',
            nombre: 'Fecha registro',
            tipoComponente: 'SelectInPutDate',
            dateType: 'true',
            valor: '2026-07-09',
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
          observaciones: this.createComponent({
            id: 'observaciones',
            nombre: 'Observaciones',
            tipoComponente: 'InPutTextArea',
            textAreaType: 'true',
            valor: 'Observaciones del caso.',
          }),
          aprobado: this.createComponent({
            id: 'aprobado',
            nombre: 'Aprobado',
            tipoComponente: 'SelectBooleanCheckBox',
            checkBoxType: 'true',
            valor: 'false',
          }),
        },
        componentesCent: {
          resumen: this.createComponent({
            id: 'resumen',
            nombre: 'Resumen detallado',
            tipoComponente: 'InPutRichText',
            richTextType: 'true',
            valor:
              '<p>Contenido enriquecido del detalle normal HTM.</p><p>Puede incluir justificaciones y notas de proceso.</p>',
            style: 'min-height:200px;width:100%;',
          }),
          historico: this.createComponent({
            id: 'historico',
            nombre: 'Histórico',
            tipoComponente: 'ListaCompuesta',
            listCompuestaType: 'true',
            textoHTMLTabla: this.createListaCompuestaHtml(),
            styleContenedor: 'width:100%;',
          }),
          textoInfo: this.createComponent({
            id: 'textoInfo',
            nombre: 'Información',
            tipoComponente: 'Label',
            labelType: 'true',
            valor:
              'Este formulario replica la operación de detalle normal con guardado, anexos de plantilla y trazabilidad.',
          }),
        },
        componentesDer: {
          tablaDetalle: this.createComponent({
            id: 'tablaDetalle',
            nombre: 'Tabla detalle',
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
          archivo: this.createComponent({
            id: 'archivo',
            nombre: 'Carga masiva',
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
      '<p>Ayuda del formulario detalle normal HTM.</p><p>El contenido se puede suministrar desde backend.</p>',
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
  public nombreCarta = 'detalle-normal-htm';
  public tipoDocPlantilla = 'detalle-normal-htm';
  public idMailSeleccionado = 'mail1';
  public componentesMail = [
    { label: 'Correo principal', value: 'mail1' },
    { label: 'Correo secundario', value: 'mail2' },
  ];

  public popupFirmaVisible = false;
  public ventanaAyudaVisible = false;
  public urlPopupFirma = 'about:blank';
  public guardadoExitoso = false;

  public datosTarea: Array<[string, string]> = [
    ['numeroTarea', '125'],
    ['nombreTarea', 'Diligenciar detalle normal HTM'],
    ['tipoTarea', 'HUMANA'],
    ['nombreWF', 'WFDetalleNormalHTM'],
    ['idInstancia', '5021'],
    ['userName', 'usuario.htm'],
    ['numInstanciaTarea', '1'],
  ];
  public variablesObjetoWorkflow: Array<[string, string]> = [
    ['idCaso', '5021'],
    ['estado', 'En edición'],
  ];
  public datosRetorno: Array<[string, string | null]> = [];
  public historicoTraza: Array<{
    atributo: string;
    valor: string | null;
    usuario: string;
    fecha: string;
    ipCliente: string;
  }> = [];

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

  public getColumnGridTemplate(seccion: SeccionEntity): string {
    const occupiedColumns = [
      seccion.componentesIzq,
      seccion.componentesCent,
      seccion.componentesDer,
    ].filter((column) => this.getComponentList(column).length > 0).length;

    return `repeat(${Math.max(occupiedColumns, 1)}, minmax(0, 1fr))`;
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
    return this.asBool(componente.obligatorio) || this.asBool(componente.obligatorioFuncional);
  }

  public addMensaje(message: string): void {
    this.mensajes = [message, ...this.mensajes].slice(0, 6);
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
    if (this.prevencionDobleClic()) {
      return;
    }

    this.tablaDetalleEnEdicion = true;
    this.guardadoExitoso = true;
    this.addMensaje('Detalle agregado correctamente.');
    this.guardarHistorico();
    this.resetPrevencionDobleClic();
  }

  public guardarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.tablaDetalleEnEdicion = false;
    this.guardadoExitoso = true;
    this.addMensaje('Registro guardado correctamente.');
    this.guardarHistorico();
    this.resetPrevencionDobleClic();
  }

  public editarFormulario(): void {
    if (this.prevencionDobleClic()) {
      return;
    }

    this.tablaDetalleEnEdicion = false;
    this.guardadoExitoso = true;
    this.addMensaje('Registro editado correctamente.');
    this.guardarHistorico();
    this.resetPrevencionDobleClic();
  }

  public eliminarRegistro(): void {
    this.tablaDetalleEnEdicion = false;
    this.guardadoExitoso = false;
    this.addMensaje('Registro cancelado.');
  }

  public nuevoRegistro(): void {
    this.componentValues = {};
    this.seedComponentValues();
    this.tablaDetalleEnEdicion = false;
    this.guardadoExitoso = false;
    this.resetPrevencionDobleClic();
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
    this.addMensaje(`Plantilla generada (${this.cartaSeleccionada}, ${this.tipoHoja}).`);
  }

  public adjuntarPlantillaPDF(): void {
    if (!this.hayRecurso) {
      this.addMensaje('No se permite anexar el documento al proceso, no se ha generado el archivo digital.');
      return;
    }

    this.addMensaje('Se anexó correctamente la plantilla PDF al proceso.');
  }

  public seleccionarMail(value: string): void {
    this.idMailSeleccionado = value;
  }

  public adjuntarPlantillaMail(): void {
    this.addMensaje(`Plantilla adjuntada al envío de correo ${this.idMailSeleccionado}.`);
  }

  public preprocesarDatosTerminacion(): void {
    const componentes: ComponenteBaseEntity[] = [];
    for (const seccion of this.secciones) {
      componentes.push(...this.getComponentList(seccion.componentesIzq));
      componentes.push(...this.getComponentList(seccion.componentesCent));
      componentes.push(...this.getComponentList(seccion.componentesDer));
    }

    const tiposPermitidos = ['InPutText', 'InPutTextArea', 'SelectInPutDate', 'SelectOneListBox', 'SelectBooleanCheckBox', 'SelectOneRadio'];
    this.datosRetorno = componentes
      .filter((comp) => tiposPermitidos.includes(comp.tipoComponente))
      .map((comp) => {
        const nombre = comp.nombre;
        const rawValue = this.getComponentValue(comp);

        if (comp.tipoComponente === 'SelectInPutDate' && rawValue) {
          const parsed = new Date(String(rawValue));
          const valorFormateado = Number.isNaN(parsed.getTime()) ? String(rawValue) : this.formatearFecha(parsed, 'yyyy-MM-dd');
          return [nombre, valorFormateado] as [string, string | null];
        }

        return [nombre, rawValue === '' ? null : String(rawValue)] as [string, string | null];
      });
  }

  private guardarHistorico(): void {
    if (!this.guardadoExitoso) {
      return;
    }

    this.preprocesarDatosTerminacion();
    const usuario = this.getDatoTarea('userName') ?? 'usuario.htm';
    const ipCliente = this.obtenerDireccionIPCliente();

    for (const [atributo, valor] of this.datosRetorno) {
      if (!atributo) {
        continue;
      }

      this.historicoTraza.unshift({
        atributo,
        valor,
        usuario,
        fecha: new Date().toISOString(),
        ipCliente,
      });
    }

    this.historicoTraza = this.historicoTraza.slice(0, 40);
    this.addMensaje('Histórico de terminación actualizado.');
  }

  private getDatoTarea(key: string): string | undefined {
    return this.datosTarea.find((entry) => entry[0] === key)?.[1];
  }

  private formatearFecha(date: Date, formato: string): string {
    if (formato === 'yyyy-MM-dd') {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }
    return date.toISOString();
  }

  private obtenerDireccionIPCliente(): string {
    return '0.0.0.0';
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
      '<tr><td>2026-07-07</td><td>Creación</td><td>analista</td></tr>',
      '<tr><td>2026-07-08</td><td>Validación</td><td>coordinador</td></tr>',
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
