import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioJSONEntity } from '../../../../entidades/forms-captura/formulario-json.entity';
import { SeccionEntity } from '../../../../entidades/forms-captura/seccion.entity';
import { ComponenteBaseEntity } from '../../../../entidades/forms-captura/componente-base.entity';
import { EntidadCatalogoEntity } from '../../../../entidades/forms-captura/entidad-catalogo.entity';
import { ColumnaEntidadEntity } from '../../../../entidades/forms-captura/columna-entidad.entity';
import { ValidacionExpresionRegularEntity } from '../../../../entidades/forms-captura/validacion-expresion-regular.entity';
import { ObservadorComponenteEntity } from '../../../../entidades/forms-captura/observador-componente.entity';
import { ComponentesComponent } from '../../plantilla-form-captura/componentes/componentes.component';
import { PlantillaFormCapturaService } from '../../plantilla-form-captura/plantilla-form-captura.service';
import { EntidadCatalogoService } from '../entidad-catalogo.service';
import { ModeladorCatalogoService } from '../modelador-catalogo.service';
import { MessageUtil } from '../../../../utilidades/message.util';

@Component({
  selector: 'app-modelar-form-captura',
  imports: [CommonModule, FormsModule, ComponentesComponent],
  templateUrl: './modelar-form-captura.component.html',
  styleUrl: './modelar-form-captura.component.scss',
})
export class ModelarFormCapturaComponent implements OnInit {
  private readonly defaultContainerWidth = '50';
  private readonly defaultFieldWidth = '90';
  private readonly defaultLabelWidth = '30';
  private readonly defaultFieldColumnWidth = '70';

  public mensaje = '';
  public mensajes: string[] = [];
  public validationBaseComponentKey = '';
  public validationExpression = '';
  public validationErrorMessage = '';
  public validationAttributeKey = '';
  public validationOperator = '=';
  public validationAttributeValue = '';
  public validationAvailableComponentKey = '';
  public validationSelectedBlockedComponentKey = '';
  public validationBlockedComponentKeys: string[] = [];
  public readonly validationOperators = ['=', '!=', '<', '>', '<=', '>='];

  public nombresEntidadesPrincipales: string[] = [];
  public nombreEntidadPrincipalStaged = '';
  public entidadPrincipalCatalogo: EntidadCatalogoEntity | null = null;
  public entidadesRelacionadasCatalogo: EntidadCatalogoEntity[] = [];
  public atributoSeleccionado: { entidad: string; columna: string } | null = null;

  public estilosComponente: string[] = [];
  public clasesCargaMasiva: string[] = [];
  public formulariosDisponibles: string[] = [];
  public formulariosConsultaDisponibles: string[] = [];
  public tiposOrdenamientoTabla: string[] = [];
  public atributosTipoLista: string[] = [];
  public atributosRuta: string[] = [];
  public nombresEntidadesRelacionadas: string[] = [];

  public validacionExp: ValidacionExpresionRegularEntity = this.createValidacionDraft();
  public mensajeValidaciones = '';

  public idObservadorSeleccionado = '';
  public nombreColumnaDeRelacionSeleccionada = '';
  public mensajesObservadores: string[] = [];

  public filtroComponenteKey = '';
  public filtroOperador = '=';
  public filtroColumna = '';

  public tablaDetalleTablaPrincipal = '';
  public nombreColumnaRelacionSeleccionada = '';
  public nombreColumnaNueva = '';

  public mostrarVentanaConfiguracionMail = false;
  public tipoParametroMail = 'Destinos';
  public readonly tiposParametroMail = ['Destinos', 'DestinosCC', 'DestinosCCO', 'Asunto', 'Mensaje'];
  public mapaRutasMail: Record<string, string[]> = {};
  public atributoRutaSeleccionado = '';

  public mostrarVentanaConfLinkToDifferentForm = false;
  public tipoFormularioEscogido = 'captura';
  public nombreFormularioLink = '';
  public nombreFormularioConsultaLink = '';
  public formulariosLinkAgregados: string[] = [];

  public mostrarVentanaAyuda = false;
  public mostrarVentanaOrganizacionSecciones = false;

  public mostrarVentanaSeleccionEntidad = false;
  public entidadForaneaSeleccionada: EntidadCatalogoEntity | null = null;
  public columnaForaneaOrigen = '';
  public columnasMostrablesSeleccionadas: Record<string, boolean> = {};
  public condicionesEntidad: Array<{ identificador: string; atributo: string; operador: string; valor: string }> = [];
  public whereEntidad = '';
  public mensajeCondiciones = '';
  public readonly operadoresCondiciones = ['=', '!=', '<', '>', '<=', '>=', '= NULL', '!= NULL'];

  public constructor(
    private cdr: ChangeDetectorRef,
    private plantillaFormCapturaService: PlantillaFormCapturaService,
    private entidadCatalogoService: EntidadCatalogoService,
    private modeladorCatalogoService: ModeladorCatalogoService,
  ) {}
  public formulario: FormularioJSONEntity = this.createDefaultForm();
  public selectedSectionKey = '';
  public selectedComponentKey = '';
  public selectedComponentType = 'InPutText';
  public selectedComponentColumn: 'componentesIzq' | 'componentesCent' | 'componentesDer' = 'componentesIzq';
  public draggedComponentType = '';
  public activeDropSectionKey = '';
  public readonly componentColumns = [
    { key: 'componentesIzq' as const, label: 'Izquierda' },
    { key: 'componentesCent' as const, label: 'Centro' },
    { key: 'componentesDer' as const, label: 'Derecha' },
  ];
  public readonly widthOptions = Array.from({ length: 20 }, (_, index) => String((index + 1) * 5));
  public readonly heightOptions = ['Normal', ...Array.from({ length: 35 }, (_, index) => String((index + 1) * 20))];
  public componentTypes = [
    'InPutText',
    'InPutTextArea',
    'SelectOneListBox',
    'SelectOneListBoxCustomized',
    'SelectOneRadioButton',
    'SelectBooleanCheckBox',
    'SelectInPutDate',
    'Label',
    'OutPutLink',
    'LinkToAForm',
    'LinkToDifferentForm',
    'LinkFormToIfaces',
    'ListaCompuesta',
    'TablaDetalles',
    'CargaMasiva',
    'SaveButton',
    'RefreshButton',
    'SearchButton',
    'Mail',
    'Separador',
    'InPutRichText',
    'FileUpload',
  ];

  public ngOnInit(): void {
    this.entidadCatalogoService.getNombresEntidadesPrincipales().subscribe((nombres) => {
      this.nombresEntidadesPrincipales = nombres;
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getEstilosComponente().subscribe((estilos) => {
      this.estilosComponente = estilos;
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getClasesCargaMasiva().subscribe((clases) => {
      this.clasesCargaMasiva = clases;
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getFormularios().subscribe((formularios) => {
      this.formulariosDisponibles = formularios;
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getFormulariosConsulta().subscribe((formularios) => {
      this.formulariosConsultaDisponibles = formularios;
      this.cdr.detectChanges();
    });
    this.modeladorCatalogoService.getTiposOrdenamientoTabla().subscribe((tipos) => {
      this.tiposOrdenamientoTabla = tipos;
      this.cdr.detectChanges();
    });
  }

  public cambiarEntidadPrincipal(): void {
    if (!this.nombreEntidadPrincipalStaged) {
      return;
    }

    this.formulario = { ...this.formulario, entidadPrincipal: this.nombreEntidadPrincipalStaged };
    this.atributoSeleccionado = null;

    this.entidadCatalogoService.getEntidadPorNombre(this.nombreEntidadPrincipalStaged).subscribe((entidad) => {
      this.entidadPrincipalCatalogo = entidad ?? null;
      this.cdr.detectChanges();
    });

    this.entidadCatalogoService.getEntidadesRelacionadasUnoAUno(this.nombreEntidadPrincipalStaged).subscribe((relacionadas) => {
      this.entidadesRelacionadasCatalogo = relacionadas;
      this.actualizarEntidadesDelFormulario();
      this.cdr.detectChanges();
    });

    this.entidadCatalogoService.getAtributosTipoLista(this.nombreEntidadPrincipalStaged).subscribe((atributos) => {
      this.atributosTipoLista = atributos;
      this.cdr.detectChanges();
    });

    this.entidadCatalogoService.getAtributosRuta(this.nombreEntidadPrincipalStaged).subscribe((atributos) => {
      this.atributosRuta = atributos;
      this.cdr.detectChanges();
    });

    this.entidadCatalogoService.getNombresEntidadesRelacionadas(this.nombreEntidadPrincipalStaged).subscribe((nombres) => {
      this.nombresEntidadesRelacionadas = nombres;
      this.cdr.detectChanges();
    });
  }

  private actualizarEntidadesDelFormulario(): void {
    const entidades: Record<string, string> = {};
    if (this.entidadPrincipalCatalogo) {
      entidades[`string_1`] = this.entidadPrincipalCatalogo.nombre;
    }
    this.entidadesRelacionadasCatalogo.forEach((entidad, index) => {
      entidades[`string_${index + 2}`] = entidad.nombre;
    });

    const entidadesRelacionadas: Record<string, string> = {};
    this.entidadesRelacionadasCatalogo.forEach((entidad, index) => {
      entidadesRelacionadas[`string_${index + 1}`] = entidad.nombre;
    });

    this.formulario = { ...this.formulario, entidades, entidadesRelacionadas };
  }

  /** Columna visible por defecto en "Atributos": todo atributo propio y las llaves foráneas 1:1 (equivalente a columnasEntidadRelacionadaSeleccionadas del bean legado). */
  public isColumnaVisibleEnAtributos(columna: ColumnaEntidadEntity): boolean {
    if (!columna.esLlaveForanea) {
      return true;
    }
    return columna.tipoRelacion === 'UnoAUno';
  }

  public getTipoDatoTitulo(columna: ColumnaEntidadEntity): string {
    if (columna.esLlaveForanea) {
      return `Llave foránea a ${columna.entidadRelacionada}`;
    }
    switch (columna.javaType) {
      case 'java.util.Date':
        return 'Tipo de dato: Date-Fecha';
      case 'java.lang.Boolean':
        return 'Tipo de dato: Boolean-Verdadero/Falso';
      case 'java.lang.Integer':
        return 'Tipo de dato: Integer-Número entero';
      case 'java.lang.Double':
        return 'Tipo de dato: Double-Número decimal';
      default:
        return 'Tipo de dato: String-Texto';
    }
  }

  public getTipoDatoIcono(columna: ColumnaEntidadEntity): string {
    if (columna.esLlaveForanea) {
      return 'FK';
    }
    switch (columna.javaType) {
      case 'java.util.Date':
        return 'FEC';
      case 'java.lang.Boolean':
        return 'BOOL';
      case 'java.lang.Integer':
      case 'java.lang.Double':
        return 'NUM';
      default:
        return 'TXT';
    }
  }

  public seleccionarColumnaEntidad(nombreEntidad: string, columna: ColumnaEntidadEntity): void {
    this.atributoSeleccionado = { entidad: nombreEntidad, columna: columna.nombre };
  }

  public isAtributoSeleccionado(nombreEntidad: string, nombreColumna: string): boolean {
    return this.atributoSeleccionado?.entidad === nombreEntidad && this.atributoSeleccionado?.columna === nombreColumna;
  }

  public addSection(): void {
    const sectionKey = `Seccion_${Object.keys(this.formulario.seccionesFormulario ?? {}).length + 1}`;
    const section: SeccionEntity = {
      titulo: `Nueva sección ${Object.keys(this.formulario.seccionesFormulario ?? {}).length + 1}`,
      descripcion: '',
      componentesIzq: {},
      componentesCent: {},
      componentesDer: {},
      guardado: 'false',
      expandido: 'true',
    };

    this.formulario = {
      ...this.formulario,
      seccionesFormulario: {
        ...(this.formulario.seccionesFormulario ?? {}),
        [sectionKey]: section,
      },
    };
    this.selectedSectionKey = sectionKey;
    this.selectedComponentKey = '';
    this.cdr.detectChanges();
  }

  public removeSelectedSection(): void {
    if (!this.selectedSectionKey) {
      return;
    }

    const sections = { ...(this.formulario.seccionesFormulario ?? {}) };
    delete sections[this.selectedSectionKey];
    this.formulario = { ...this.formulario, seccionesFormulario: sections };
    this.selectedSectionKey = Object.keys(sections)[0] ?? '';
    this.selectedComponentKey = '';
    this.cdr.detectChanges();
  }

  public updateSelectedSectionProperty(property: keyof SeccionEntity, value: string): void {
    const section = this.formulario.seccionesFormulario?.[this.selectedSectionKey];
    if (!section) {
      return;
    }

    const updatedSection = { ...section, [property]: value } as SeccionEntity;
    this.formulario = {
      ...this.formulario,
      seccionesFormulario: {
        ...(this.formulario.seccionesFormulario ?? {}),
        [this.selectedSectionKey]: updatedSection,
      },
    };
  }

  public addComponentToSelectedSection(): void {
    if (!this.selectedSectionKey) {
      return;
    }

    this.addComponentToSection(this.selectedSectionKey, this.selectedComponentType, 'componentesIzq');
  }

  public addComponentToSection(
    sectionKey: string,
    componentType: string,
    column: 'componentesIzq' | 'componentesCent' | 'componentesDer' = this.selectedComponentColumn,
  ): string | null {
    if (!sectionKey) {
      return null;
    }

    const section = this.formulario.seccionesFormulario?.[sectionKey];
    if (!section) {
      return null;
    }

    // The legacy JSON keeps all three collections, but capture forms render componentesIzq.
    const functionalColumn = 'componentesIzq' as const;
    const components = section[functionalColumn];
    const componentKey = `Componente_${Object.keys(components && typeof components !== 'string' ? components : {}).length + 1}`;
    const component = this.buildComponentEntity(componentType, componentKey);
    if (this.atributoSeleccionado) {
      component.nombreEntidad = this.atributoSeleccionado.entidad;
      component.idColumna = `${this.atributoSeleccionado.entidad}|${this.atributoSeleccionado.columna}`;
      this.atributoSeleccionado = null;
    }

    const updatedSection: SeccionEntity = {
      ...section,
      [functionalColumn]: {
        ...(components && typeof components !== 'string' ? components : {}),
        [componentKey]: component,
      },
    };

    this.formulario = {
      ...this.formulario,
      seccionesFormulario: {
        ...(this.formulario.seccionesFormulario ?? {}),
        [sectionKey]: updatedSection,
      },
    };

    this.selectedSectionKey = sectionKey;
    this.selectedComponentKey = componentKey;
    this.selectedComponentType = componentType;
    this.selectedComponentColumn = functionalColumn;
    this.cdr.detectChanges();
    return componentKey;
  }

  public dragComponent(type: string, event: DragEvent): void {
    this.draggedComponentType = type;
    event.dataTransfer?.setData('text/plain', type);
  }

  public allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  public onSectionDragOver(sectionKey: string, event: DragEvent): void {
    this.allowDrop(event);
    this.activeDropSectionKey = sectionKey;
  }

  public onSectionDragLeave(sectionKey: string, event: DragEvent): void {
    if (this.activeDropSectionKey === sectionKey) {
      this.activeDropSectionKey = '';
    }
  }

  public isDraggingOverSection(sectionKey: string): boolean {
    return this.activeDropSectionKey === sectionKey;
  }

  public isInputLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['InPutText', 'InPutTextArea', 'SelectOneListBox', 'SelectOneListBoxCustomized', 'SelectOneRadioButton', 'SelectBooleanCheckBox', 'SelectInPutDate', 'InPutRichText', 'FileUpload'].includes(component.tipoComponente);
  }

  public isListLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['SelectOneListBox', 'SelectOneListBoxCustomized', 'SelectOneRadioButton'].includes(component.tipoComponente);
  }

  public isFileUploadComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['CargaMasiva', 'FileUpload'].includes(component.tipoComponente);
  }

  public isTableLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['TablaDetalles', 'TableSQLQuery', 'ListaCompuesta'].includes(component.tipoComponente);
  }

  public isButtonLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['SaveButton', 'RefreshButton', 'SearchButton'].includes(component.tipoComponente);
  }

  public isLinkLikeComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['OutPutLink', 'LinkToAForm', 'LinkToDifferentForm', 'LinkFormToIfaces'].includes(component.tipoComponente);
  }

  public dropComponent(sectionKey: string, event: DragEvent): void {
    this.allowDrop(event);
    this.activeDropSectionKey = '';
    const data = event.dataTransfer?.getData('text/plain') ?? '';
    if (data.startsWith('component:')) {
      const sourceKey = data.replace('component:', '');
      this.moveComponentInSection(sectionKey, sourceKey, '');
      this.draggedComponentType = '';
      return;
    }

    const componentType = data || this.draggedComponentType;
    if (!componentType) {
      return;
    }

    this.addComponentToSection(sectionKey, componentType);
    this.draggedComponentType = '';
  }

  public selectSection(key: string): void {
    this.selectedSectionKey = key;
    this.selectedComponentKey = '';
  }

  /**
   * Las claves de componente se repiten entre secciones (Componente_1, Componente_2...),
   * por eso la selección desde el visualizador debe indicar en qué sección ocurrió el clic.
   */
  public selectComponent(key: string, sectionKey?: string): void {
    const targetSectionKey = sectionKey || this.selectedSectionKey;
    const section = this.formulario.seccionesFormulario?.[targetSectionKey];
    const components = section?.componentesIzq;

    if (!components || typeof components === 'string' || !(key in components)) {
      this.selectedComponentKey = '';
      return;
    }

    this.selectedSectionKey = targetSectionKey;
    this.selectedComponentKey = key;
    this.selectedComponentColumn = 'componentesIzq';

    this.loadLogicalValidationDraft(components[key] as ComponenteBaseEntity, key);
    this.cdr.detectChanges();
  }

  public getValidationComponentEntries(): Array<{ key: string; value: ComponenteBaseEntity }> {
    return this.getAllComponentEntries().filter(({ key }) => key !== this.validationBaseComponentKey);
  }

  public getAllComponentEntries(): Array<{ key: string; value: ComponenteBaseEntity }> {
    const entries: Array<{ key: string; value: ComponenteBaseEntity }> = [];
    for (const section of this.getSectionEntries()) {
      const components = section.value.componentesIzq;
      if (!components || typeof components === 'string') {
        continue;
      }
      for (const [key, value] of Object.entries(components)) {
        if (value) {
          entries.push({ key, value: value as ComponenteBaseEntity });
        }
      }
    }
    return entries;
  }

  public setValidationBaseComponent(key: string): void {
    this.validationBaseComponentKey = key;
    this.validationBlockedComponentKeys = this.validationBlockedComponentKeys.filter((item) => item !== key);
    const component = this.getAllComponentEntries().find((entry) => entry.key === key)?.value;
    if (component) {
      this.loadLogicalValidationDraft(component, key);
    }
  }

  public getValidationAvailableEntries(): Array<{ key: string; value: ComponenteBaseEntity }> {
    return this.getValidationComponentEntries().filter(
      ({ key }) => !this.validationBlockedComponentKeys.includes(key),
    );
  }

  public getValidationBlockedEntries(): Array<{ key: string; value: ComponenteBaseEntity }> {
    return this.getValidationComponentEntries().filter(
      ({ key }) => this.validationBlockedComponentKeys.includes(key),
    );
  }

  public addValidationBlockedComponent(): void {
    if (!this.validationAvailableComponentKey || this.validationAvailableComponentKey === this.validationBaseComponentKey) {
      return;
    }
    if (!this.validationBlockedComponentKeys.includes(this.validationAvailableComponentKey)) {
      this.validationBlockedComponentKeys = [
        ...this.validationBlockedComponentKeys,
        this.validationAvailableComponentKey,
      ];
    }
    this.validationSelectedBlockedComponentKey = this.validationAvailableComponentKey;
    this.validationAvailableComponentKey = '';
  }

  public removeValidationBlockedComponent(): void {
    if (!this.validationSelectedBlockedComponentKey) {
      return;
    }
    this.validationBlockedComponentKeys = this.validationBlockedComponentKeys.filter(
      (key) => key !== this.validationSelectedBlockedComponentKey,
    );
    this.validationAvailableComponentKey = this.validationSelectedBlockedComponentKey;
    this.validationSelectedBlockedComponentKey = '';
  }

  public addValidationAttribute(): void {
    if (!this.validationAttributeKey || !this.validationAttributeValue) {
      this.addMensaje('Seleccione un componente y digite un valor para agregarlo a la expresión.');
      return;
    }

    const attribute = `${this.validationAttributeKey}${this.validationOperator}[${this.validationAttributeValue}]`;
    this.validationExpression = this.validationExpression
      ? `${this.validationExpression}${attribute}`
      : attribute;
  }

  public appendValidationToken(token: 'AND' | 'OR' | 'NOT' | '()'): void {
    const tokenText = token === 'AND' ? '() AND ()' : token === 'OR' ? '() OR ()' : token === 'NOT' ? 'NOT()' : '()';
    this.validationExpression = this.validationExpression
      ? `${this.validationExpression} ${tokenText}`
      : tokenText;
  }

  public toggleValidationBlockedComponent(key: string): void {
    if (this.validationBlockedComponentKeys.includes(key)) {
      this.validationBlockedComponentKeys = this.validationBlockedComponentKeys.filter((item) => item !== key);
      return;
    }
    this.validationBlockedComponentKeys = [...this.validationBlockedComponentKeys, key];
  }

  public isValidationComponentBlocked(key: string): boolean {
    return this.validationBlockedComponentKeys.includes(key);
  }

  public saveLogicalValidation(): void {
    const baseComponent = this.getAllComponentEntries().find(({ key }) => key === this.validationBaseComponentKey)?.value;
    if (!baseComponent || !this.validationExpression.trim()) {
      this.addMensaje('Seleccione el componente base y construya una expresión lógica.');
      return;
    }

    const validation = {
      componenteBase: this.validationBaseComponentKey,
      expresion: this.validationExpression.trim(),
      mensajeError: this.validationErrorMessage,
      componentesBloqueados: this.validationBlockedComponentKeys,
    };
    baseComponent.componentesNuevaValidacionEntreComponentes = validation.expresion;
    baseComponent.componentesRelacionados = this.validationBlockedComponentKeys.join(',');
    baseComponent.arbolesExpresionNuevaValidacionEntreComponentes = JSON.stringify(validation);
    baseComponent.esOrigenValidacion = 'true';
    this.selectedComponentKey = this.validationBaseComponentKey;
    this.addMensaje('Validación lógica guardada en el componente base.');
  }

  public getGeneratedLogicalValidations(): Array<{
    key: string;
    baseName: string;
    expression: string;
    blockedNames: string;
  }> {
    return this.getAllComponentEntries()
      .filter(({ value }) => !!value.componentesNuevaValidacionEntreComponentes)
      .map(({ key, value }) => ({
        key,
        baseName: value.nombre || key,
        expression: value.componentesNuevaValidacionEntreComponentes,
        blockedNames: value.componentesRelacionados
          ? value.componentesRelacionados
            .split(',')
            .map((blockedKey) => this.getAllComponentEntries().find((entry) => entry.key === blockedKey)?.value.nombre ?? blockedKey)
            .join(', ')
          : '',
      }));
  }

  public removeLogicalValidation(key: string): void {
    const component = this.getAllComponentEntries().find((entry) => entry.key === key)?.value;
    if (!component) {
      return;
    }
    component.componentesNuevaValidacionEntreComponentes = '';
    component.arbolesExpresionNuevaValidacionEntreComponentes = '';
    component.componentesRelacionados = '';
    component.esOrigenValidacion = 'false';
    if (this.validationBaseComponentKey === key) {
      this.validationExpression = '';
      this.validationBlockedComponentKeys = [];
      this.validationErrorMessage = '';
    }
  }

  private loadLogicalValidationDraft(component: ComponenteBaseEntity, componentKey: string): void {
    this.validationBaseComponentKey = componentKey;
    this.validationExpression = component.componentesNuevaValidacionEntreComponentes || '';
    this.validationBlockedComponentKeys = component.componentesRelacionados
      ? component.componentesRelacionados.split(',').map((item) => item.trim()).filter(Boolean)
      : [];
    this.validationErrorMessage = '';

    if (!component.arbolesExpresionNuevaValidacionEntreComponentes) {
      return;
    }

    try {
      const validation = JSON.parse(component.arbolesExpresionNuevaValidacionEntreComponentes) as {
        mensajeError?: string;
        componentesBloqueados?: string[];
      };
      this.validationErrorMessage = validation.mensajeError ?? '';
      this.validationBlockedComponentKeys = validation.componentesBloqueados ?? this.validationBlockedComponentKeys;
    } catch {
      this.addMensaje('No fue posible interpretar la validación lógica existente.');
    }
  }

  public reorderComponent(event: { sourceKey: string; targetKey: string; sectionKey: string }): void {
    this.moveComponentInSection(event.sectionKey, event.sourceKey, event.targetKey);
    this.selectComponent(event.targetKey, event.sectionKey);
  }

  public moveComponentInSection(sectionKey: string, sourceKey: string, targetKey: string): void {
    const section = this.formulario.seccionesFormulario?.[sectionKey];
    const column = 'componentesIzq' as const;
    const components = section?.[column];
    if (!components || typeof components === 'string' || !sourceKey) {
      return;
    }

    const entries = Object.entries(components as Record<string, ComponenteBaseEntity | undefined>);
    const sourceEntry = entries.find(([key]) => key === sourceKey);
    if (!sourceEntry) {
      return;
    }

    const withoutSource = entries.filter(([key]) => key !== sourceKey);
    const targetIndex = targetKey
      ? withoutSource.findIndex(([key]) => key === targetKey)
      : -1;
    const insertIndex = targetIndex >= 0 ? targetIndex + 1 : withoutSource.length;

    withoutSource.splice(insertIndex, 0, sourceEntry);

    const reorderedComponents = Object.fromEntries(withoutSource) as Record<string, ComponenteBaseEntity>;
    const updatedSection: SeccionEntity = {
      ...section,
      [column]: reorderedComponents,
    };

    this.formulario = {
      ...this.formulario,
      seccionesFormulario: {
        ...(this.formulario.seccionesFormulario ?? {}),
        [sectionKey]: updatedSection,
      },
    };
    this.selectedComponentColumn = column;
    this.cdr.detectChanges();
  }

  public getSelectedComponent(): ComponenteBaseEntity | null {
    if (!this.selectedSectionKey || !this.selectedComponentKey) {
      return null;
    }

    const section = this.formulario.seccionesFormulario?.[this.selectedSectionKey];
    const components = section?.[this.selectedComponentColumn];
    if (!components || typeof components === 'string') {
      return null;
    }

    return (components as Record<string, ComponenteBaseEntity | undefined>)[this.selectedComponentKey] ?? null;
  }

  public updateSelectedComponentProperty(property: string, value: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    const booleanProperties = new Set([
      'cambiado', 'obligatorio', 'obligatorioFuncional', 'readOnly', 'guardado',
      'cumpleValidaciones', 'opcionExtra', 'visible', 'filtro', 'utilizaImagen',
      'mostrarLink', 'estaSujeto', 'esOrigenValidacion', 'dirigeFormularioConsulta',
      'mostrarBotonAgregar', 'mostrarBotonBuscar', 'mostrarBotonEliminar', 'soloTexto', 'labelOrganizable',
    ]);
    (selected as unknown as Record<string, unknown>)[property] = booleanProperties.has(property)
      ? (value === 'true' ? 'true' : 'false')
      : value;
  }

  /** Los multi-select entregan el arreglo directamente (atributos a transportar). */
  public updateSelectedComponentArrayProperty(property: string, values: string[]): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    (selected as unknown as Record<string, unknown>)[property] = values ?? [];
  }

  public updateFormProperty(property: keyof FormularioJSONEntity, value: string): void {
    const booleanProperties = new Set([
      'nuevo', 'edicion', 'eliminable', 'diligenciable', 'consultable', 'plantillasMostrables',
    ]);
    this.formulario = {
      ...this.formulario,
      [property]: booleanProperties.has(property) ? (value === 'true' ? 'true' : 'false') : value,
    } as FormularioJSONEntity;
  }

  public updateSelectedComponentObjectProperty(property: string, value: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    (selected as unknown as Record<string, unknown>)[property] = value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  public getSelectedComponentObjectProperty(property: string): string {
    const selected = this.getSelectedComponent() as unknown as Record<string, unknown> | null;
    const value = selected?.[property];
    return value && typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
  }

  public updateSelectedComponentJsonProperty(property: string, value: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    try {
      (selected as unknown as Record<string, unknown>)[property] = value ? JSON.parse(value) : {};
    } catch {
      this.addMensaje(`La propiedad ${property} debe contener un JSON válido.`);
    }
  }

  public getSelectedComponentWidth(property: 'container' | 'field'): string {
    const selected = this.getSelectedComponent();
    const source = property === 'container' ? selected?.styleContenedor : selected?.style;
    const match = source?.match(/width\s*:\s*([\d.]+)%/i);
    if (match?.[1]) {
      return match[1];
    }

    return property === 'container' ? this.defaultContainerWidth : this.defaultFieldWidth;
  }

  public getSelectedComponentHeight(property: 'container' | 'field'): string {
    const selected = this.getSelectedComponent();
    const source = property === 'container' ? selected?.styleContenedor : selected?.style;
    const match = source?.match(/height\s*:\s*([\d.]+)px/i);
    return match?.[1] ?? 'Normal';
  }

  public updateSelectedComponentLayout(
    property: 'containerWidth' | 'containerHeight' | 'fieldWidth' | 'fieldHeight' | 'labelWidth' | 'fieldColumnWidth',
    value: string,
  ): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    if (property === 'containerWidth' || property === 'containerHeight') {
      const width = property === 'containerWidth' ? value : this.getSelectedComponentWidth('container');
      const height = property === 'containerHeight' ? value : this.getSelectedComponentHeight('container');
      selected.styleContenedor = `width:${width}%;${height !== 'Normal' ? `height:${height}px;` : ''}`;
      return;
    }

    if (property === 'fieldWidth' || property === 'fieldHeight') {
      const width = property === 'fieldWidth' ? value : this.getSelectedComponentWidth('field');
      const height = property === 'fieldHeight' ? value : this.getSelectedComponentHeight('field');
      selected.style = `width:${width}%;${height !== 'Normal' ? `height:${height}px;` : ''}`;
      return;
    }

    const fieldWidth = this.getSelectedComponentColumnWidth('field');
    selected.columnClasses = `width${value},width${fieldWidth}`;
  }

  public getSelectedComponentColumnWidth(part: 'label' | 'field'): string {
    const selected = this.getSelectedComponent();
    const columns = selected?.columnClasses?.split(',').map((item) => item.trim()) ?? [];
    const value = columns[part === 'label' ? 0 : 1];
    if (value) {
      const width = value.replace(/^width/i, '').replace('%', '');
      if (width) {
        return width;
      }
    }

    return part === 'label' ? this.defaultLabelWidth : this.defaultFieldColumnWidth;
  }

  public updateSelectedComponentValue(value: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    selected.valor = {
      ...(selected.valor ?? { class: 'java.lang.String' }),
      ['value']: value,
      class: 'java.lang.String',
    };
  }

  public updateSelectedComponentDefaultValue(value: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    selected.valorDefecto = {
      ...(selected.valorDefecto ?? { class: 'java.lang.String' }),
      ['value']: value,
      class: 'java.lang.String',
    };
  }

  public guardarFormulario(): void {
    if (!this.formulario || !this.validarCamposObligatorios()) {
      return;
    }

    this.plantillaFormCapturaService.guardarFormulario(this.formulario).subscribe({
      next: () => {
        this.mensaje = 'Formulario guardado correctamente.';
        this.mensajes = [this.mensaje, ...this.mensajes].slice(0, 5);
      },
      error: (error) => {
        this.mensaje = MessageUtil.buildErrorMessageFrmResponse('No fue posible guardar el formulario.', error);
        this.mensajes = [this.mensaje, ...this.mensajes].slice(0, 5);
      },
    });
  }

  public addMensaje(message: string): void {
    if (!message) {
      return;
    }

    this.mensajes = [message, ...this.mensajes].slice(0, 5);
  }

  public getSectionEntries(): Array<{ key: string; value: SeccionEntity }> {
    return Object.entries(this.formulario.seccionesFormulario ?? {}).map(([key, value]) => ({
      key,
      value: value as SeccionEntity,
    }));
  }

  public getComponentEntries(sectionKey: string): Array<{ key: string; value: ComponenteBaseEntity }> {
    const section = this.formulario.seccionesFormulario?.[sectionKey];
    if (!section) {
      return [];
    }

    return this.getComponentEntriesForColumn(sectionKey, this.selectedComponentColumn);
  }

  public getComponentEntriesForColumn(
    sectionKey: string,
    column: 'componentesIzq' | 'componentesCent' | 'componentesDer',
  ): Array<{ key: string; value: ComponenteBaseEntity }> {
    const components = this.formulario.seccionesFormulario?.[sectionKey]?.[column];
    if (!components || typeof components === 'string') {
      return [];
    }

    return Object.entries(components as Record<string, ComponenteBaseEntity | undefined>)
      .filter((entry): entry is [string, ComponenteBaseEntity] => !!entry[1])
      .map(([key, value]) => ({ key, value }));
  }


  // ---------------------------------------------------------------- Componente: identificación

  /** El legado muestra "Asignado a" (id de solo lectura) para componentes ligados a una columna. */
  public isComponenteLigadoAColumna(component: ComponenteBaseEntity | null): boolean {
    if (!component) {
      return false;
    }
    const tiposConIdentificadorLibre = [
      'ListaCompuesta', 'Separador', 'OutPutLink', 'LinkToAForm', 'LinkToDifferentForm',
      'LinkFormToIfaces', 'Label', 'TablaDetalles', 'CargaMasiva', 'FileUpload', 'Mail',
      'SearchButton', 'RefreshButton', 'SaveButton', 'SelectOneListBoxCustomized',
    ];
    return !tiposConIdentificadorLibre.includes(component.tipoComponente);
  }

  public isLabelComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'Label';
  }

  public isMailComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'Mail';
  }

  public isSearchButtonComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'SearchButton';
  }

  public isTablaDetalleComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'TablaDetalles';
  }

  public isListaCompuestaComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'ListaCompuesta';
  }

  public isLinkToAFormComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'LinkToAForm';
  }

  public isLinkToDifferentFormComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'LinkToDifferentForm';
  }

  public isListBoxCustomizedComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'SelectOneListBoxCustomized';
  }

  public isRichTextComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'InPutRichText';
  }

  public isRadioButtonComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && component.tipoComponente === 'SelectOneRadioButton';
  }

  public isDateOrTextComponent(component: ComponenteBaseEntity | null): boolean {
    return !!component && ['SelectInPutDate', 'InPutText', 'InPutTextArea'].includes(component.tipoComponente);
  }

  public isFiltrableComponent(component: ComponenteBaseEntity | null): boolean {
    return this.isTablaDetalleComponent(component) || this.isSearchButtonComponent(component);
  }

  /** Columna del título de filtros: "Columnas" para tabla detalle, "Atributos" para botón consulta. */
  public getTituloColumnaFiltro(): string {
    return this.isTablaDetalleComponent(this.getSelectedComponent()) ? 'Columnas' : 'Atributos';
  }

  /** obtenerOperadoresComponentes del bean: la tabla detalle admite todos, el botón consulta solo igualdad. */
  public getOperadoresComponentes(): string[] {
    return this.isTablaDetalleComponent(this.getSelectedComponent())
      ? ['=', '!=', '<', '>', '<=', '>=']
      : ['='];
  }

  // ---------------------------------------------------------------- Nuevo componente / guardar atributos

  public nuevoComponente(): void {
    this.selectedComponentKey = '';
    this.selectedComponentType = 'InPutText';
    this.atributoSeleccionado = null;
    this.validacionExp = this.createValidacionDraft();
    this.mensajeValidaciones = '';
    this.mensajesObservadores = [];
    this.addMensaje('Listo para configurar un nuevo componente.');
  }

  public guardarAtributosComponente(): void {
    if (!this.getSelectedComponent()) {
      this.addMensaje('Seleccione un componente para actualizar sus atributos.');
      return;
    }
    this.addMensaje('Atributos del componente actualizados.');
    this.cdr.detectChanges();
  }

  // ---------------------------------------------------------------- Validaciones de expresión regular

  private createValidacionDraft(): ValidacionExpresionRegularEntity {
    return { nombre: '', ejemplo: '', entrada: '', expresion: '', mensajeValidacion: '', cumple: false };
  }

  public getValidacionesComponente(): ValidacionExpresionRegularEntity[] {
    const selected = this.getSelectedComponent();
    if (!selected?.validacionesExpresiones) {
      return [];
    }
    try {
      const parsed = JSON.parse(selected.validacionesExpresiones);
      return Array.isArray(parsed) ? (parsed as ValidacionExpresionRegularEntity[]) : [];
    } catch {
      return [];
    }
  }

  private setValidacionesComponente(validaciones: ValidacionExpresionRegularEntity[]): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    selected.validacionesExpresiones = validaciones.length ? JSON.stringify(validaciones) : '';
  }

  public probarValidacion(): void {
    if (!this.validacionExp.entrada || !this.validacionExp.expresion) {
      this.mensajeValidaciones = 'Ingrese el valor de prueba y/o la expresión a validar';
      return;
    }
    try {
      const patron = new RegExp(`^(?:${this.validacionExp.expresion})$`);
      this.validacionExp.cumple = patron.test(this.validacionExp.entrada);
      this.mensajeValidaciones = this.validacionExp.cumple
        ? 'Concuerda'
        : this.validacionExp.mensajeValidacion || 'No concuerda';
    } catch {
      this.validacionExp.cumple = false;
      this.mensajeValidaciones = 'No se puede compilar la expresión regular';
    }
  }

  public agregarValidacion(): void {
    if (
      !this.validacionExp.nombre ||
      !this.validacionExp.ejemplo ||
      !this.validacionExp.expresion ||
      !this.validacionExp.mensajeValidacion
    ) {
      this.mensajeValidaciones = 'No ha diligenciado los campos obligatorios de la validación';
      return;
    }

    const validaciones = [...this.getValidacionesComponente(), { ...this.validacionExp, entrada: '', cumple: false }];
    this.setValidacionesComponente(validaciones);
    this.validacionExp = this.createValidacionDraft();
    this.mensajeValidaciones = '';
  }

  public eliminarValidacion(nombre: string): void {
    this.setValidacionesComponente(this.getValidacionesComponente().filter((item) => item.nombre !== nombre));
  }

  public cargarValidacionesBD(): void {
    this.modeladorCatalogoService.getValidacionesBD().subscribe((validaciones) => {
      const existentes = this.getValidacionesComponente();
      const nuevas = validaciones.filter((item) => !existentes.some((actual) => actual.nombre === item.nombre));
      this.setValidacionesComponente([...existentes, ...nuevas]);
      this.mensajeValidaciones = `Se cargaron ${nuevas.length} validaciones del catálogo.`;
      this.cdr.detectChanges();
    });
  }

  public guardarValidacionesBD(): void {
    const validaciones = this.getValidacionesComponente();
    if (!validaciones.length) {
      this.mensajeValidaciones = 'No hay validaciones para guardar.';
      return;
    }
    this.modeladorCatalogoService.guardarValidacionesBD(validaciones).subscribe((mensaje) => {
      this.mensajeValidaciones = mensaje;
      this.cdr.detectChanges();
    });
  }

  // ---------------------------------------------------------------- Observadores

  /** itemsListasDesplegables del bean: solo listas y radios distintos del componente en edición. */
  public getItemsListasDesplegables(): Array<{ key: string; value: ComponenteBaseEntity }> {
    return this.getAllComponentEntries().filter(
      ({ key, value }) =>
        key !== this.selectedComponentKey &&
        ['SelectOneListBox', 'SelectOneRadioButton'].includes(value.tipoComponente),
    );
  }

  public getItemsColumnasDeRelacion(): string[] {
    return (this.entidadPrincipalCatalogo?.columnas ?? [])
      .filter((columna) => columna.esLlaveForanea)
      .map((columna) => columna.nombre);
  }

  public getObservadoresComponente(): ObservadorComponenteEntity[] {
    const selected = this.getSelectedComponent();
    if (!selected?.observadores) {
      return [];
    }

    let relaciones: Record<string, string> = {};
    try {
      relaciones = selected.relacionObservadorColumna ? JSON.parse(selected.relacionObservadorColumna) : {};
    } catch {
      relaciones = {};
    }

    return selected.observadores
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((claveComponente) => {
        const observador = this.getAllComponentEntries().find((entry) => entry.key === claveComponente)?.value;
        return {
          claveComponente,
          nombre: observador?.nombre ?? claveComponente,
          idColumna: observador?.idColumna ?? '',
          atributoUnion: relaciones[claveComponente] ?? '',
        };
      });
  }

  public asignarObservador(): void {
    this.mensajesObservadores = [];
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    if (!this.idObservadorSeleccionado) {
      this.mensajesObservadores = ['Seleccione un componente observador'];
      return;
    }
    if (!this.nombreColumnaDeRelacionSeleccionada) {
      this.mensajesObservadores = ['Seleccione una columna que relacione los componentes.'];
      return;
    }

    const observadores = this.getObservadoresComponente();
    if (observadores.some((item) => item.claveComponente === this.idObservadorSeleccionado)) {
      this.mensajesObservadores = ['Este componente ya contiene ese observador.'];
      return;
    }

    const claves = [...observadores.map((item) => item.claveComponente), this.idObservadorSeleccionado];
    const relaciones: Record<string, string> = {};
    observadores.forEach((item) => (relaciones[item.claveComponente] = item.atributoUnion));
    relaciones[this.idObservadorSeleccionado] = this.nombreColumnaDeRelacionSeleccionada;

    selected.observadores = claves.join(',');
    selected.relacionObservadorColumna = JSON.stringify(relaciones);
    this.idObservadorSeleccionado = '';
    this.nombreColumnaDeRelacionSeleccionada = '';
  }

  public eliminarObservador(claveComponente: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }

    const observadores = this.getObservadoresComponente().filter((item) => item.claveComponente !== claveComponente);
    const relaciones: Record<string, string> = {};
    observadores.forEach((item) => (relaciones[item.claveComponente] = item.atributoUnion));

    selected.observadores = observadores.map((item) => item.claveComponente).join(',');
    selected.relacionObservadorColumna = observadores.length ? JSON.stringify(relaciones) : '';
  }

  // ---------------------------------------------------------------- Filtros (tabla detalle / botón consulta)

  public getColumnasFiltroDisponibles(): string[] {
    const selected = this.getSelectedComponent();
    if (this.isTablaDetalleComponent(selected)) {
      return this.getColumnasOrganizadas();
    }
    const entidad = selected?.nombreEntidad || this.formulario.entidadPrincipal;
    if (entidad === this.entidadPrincipalCatalogo?.nombre) {
      return (this.entidadPrincipalCatalogo?.columnas ?? []).map((columna) => columna.nombre);
    }
    const relacionada = this.entidadesRelacionadasCatalogo.find((item) => item.nombre === entidad);
    return (relacionada?.columnas ?? []).map((columna) => columna.nombre);
  }

  public agregarAtributoFiltro(): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    if (!this.filtroComponenteKey || !this.filtroColumna) {
      this.addMensaje('Seleccione el componente y la columna del filtro.');
      return;
    }

    const atributo = `${this.filtroComponenteKey}${this.filtroOperador}[${this.filtroColumna}]`;
    selected.expresionLogicaFiltro = selected.expresionLogicaFiltro
      ? `${selected.expresionLogicaFiltro}${atributo}`
      : atributo;
  }

  public appendFiltroToken(token: 'AND' | 'OR' | 'NOT' | '()'): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    const texto = token === 'AND' ? '() AND ()' : token === 'OR' ? '() OR ()' : token === 'NOT' ? 'NOT()' : '()';
    selected.expresionLogicaFiltro = selected.expresionLogicaFiltro
      ? `${selected.expresionLogicaFiltro} ${texto}`
      : texto;
  }

  // ---------------------------------------------------------------- Tabla detalle

  public getEntidadesTablaDetalle(): string[] {
    return this.entidadesRelacionadasCatalogo.map((entidad) => entidad.nombre);
  }

  public getColumnasTablaDetalle(): string[] {
    const entidad = this.entidadesRelacionadasCatalogo.find(
      (item) => item.nombre === this.tablaDetalleTablaPrincipal,
    );
    return (entidad?.columnas ?? []).map((columna) => columna.nombre);
  }

  public getColumnasForaneasPrincipal(): string[] {
    return (this.entidadPrincipalCatalogo?.columnas ?? [])
      .filter((columna) => columna.esLlaveForanea)
      .map((columna) => columna.nombre);
  }

  public getColumnasEntidadPrincipal(): string[] {
    return (this.entidadPrincipalCatalogo?.columnas ?? []).map((columna) => columna.nombre);
  }

  public escucharCambioTablaDetalle(nombreTabla: string): void {
    this.tablaDetalleTablaPrincipal = nombreTabla;
    const selected = this.getSelectedComponent();
    if (selected) {
      selected.idColumna = `${nombreTabla}|id`;
    }
  }

  /** nombresOrganizados del legado: mapa indexado que conserva el orden de las columnas de la tabla. */
  public getColumnasOrganizadas(): string[] {
    const selected = this.getSelectedComponent();
    const organizadas = selected?.nombresOrganizados ?? {};
    return Object.keys(organizadas)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => organizadas[key]);
  }

  private setColumnasOrganizadas(columnas: string[]): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    const organizadas: Record<string, string> = {};
    columnas.forEach((columna, index) => (organizadas[String(index)] = columna));
    selected.nombresOrganizados = organizadas;
  }

  public agregarColumnaOrganizada(nombreColumna: string): void {
    if (!nombreColumna) {
      return;
    }
    const columnas = this.getColumnasOrganizadas();
    if (columnas.includes(nombreColumna)) {
      this.addMensaje('Esa columna ya fue agregada a la tabla.');
      return;
    }
    this.setColumnasOrganizadas([...columnas, nombreColumna]);
  }

  public eliminarColumnaOrganizada(nombreColumna: string): void {
    this.setColumnasOrganizadas(this.getColumnasOrganizadas().filter((item) => item !== nombreColumna));
  }

  public moverColumnaOrganizada(nombreColumna: string, direccion: -1 | 1): void {
    const columnas = this.getColumnasOrganizadas();
    const indice = columnas.indexOf(nombreColumna);
    const destino = indice + direccion;
    if (indice < 0 || destino < 0 || destino >= columnas.length) {
      return;
    }
    [columnas[indice], columnas[destino]] = [columnas[destino], columnas[indice]];
    this.setColumnasOrganizadas(columnas);
  }

  public getTituloColumnaTabla(nombreColumna: string): string {
    const selected = this.getSelectedComponent();
    return (selected?.nombresColumnas ?? {})[nombreColumna] ?? '';
  }

  public updateTituloColumnaTabla(nombreColumna: string, titulo: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    selected.nombresColumnas = { ...(selected.nombresColumnas ?? {}), [nombreColumna]: titulo };
  }

  public getFormatoColumnaTabla(nombreColumna: string): string {
    const selected = this.getSelectedComponent();
    return (selected?.formatosColumnas ?? {})[nombreColumna] ?? '';
  }

  public updateFormatoColumnaTabla(nombreColumna: string, formato: string): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    selected.formatosColumnas = { ...(selected.formatosColumnas ?? {}), [nombreColumna]: formato };
  }

  // ---------------------------------------------------------------- Lista compuesta (consulta SQL)

  public getColumnasConsulta(): string[] {
    const selected = this.getSelectedComponent();
    const columnas = selected?.nombresColumnas ?? {};
    return Object.keys(columnas)
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => columnas[key]);
  }

  private setColumnasConsulta(columnas: string[]): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    const mapa: Record<string, string> = {};
    columnas.forEach((columna, index) => (mapa[String(index)] = columna));
    selected.nombresColumnas = mapa;
  }

  public agregarColumnaConsulta(): void {
    if (!this.nombreColumnaNueva) {
      this.addMensaje('No ha digitado el nombre de la columna');
      return;
    }
    const columnas = this.getColumnasConsulta();
    if (columnas.includes(this.nombreColumnaNueva)) {
      this.addMensaje('Ya existe una columna con el mismo nombre, por favor escriba uno diferente');
      return;
    }
    this.setColumnasConsulta([...columnas, this.nombreColumnaNueva]);
    this.nombreColumnaNueva = '';
  }

  public eliminarColumnaConsulta(nombreColumna: string): void {
    this.setColumnasConsulta(this.getColumnasConsulta().filter((item) => item !== nombreColumna));
  }

  public ejecutarConsultaGenerica(): void {
    const selected = this.getSelectedComponent();
    if (!selected?.query) {
      this.addMensaje('No ha digitado la sentencia SQL para el componente');
      return;
    }
    this.addMensaje('Consulta enviada (simulada): el microservicio de ejecución aún no está disponible.');
  }

  // ---------------------------------------------------------------- Configuración de Mail

  public abrirVentanaConfiguracionMail(): void {
    this.tiposParametroMail.forEach((tipo) => {
      if (!this.mapaRutasMail[tipo]) {
        this.mapaRutasMail[tipo] = this.formulario.entidadPrincipal ? [this.formulario.entidadPrincipal] : [];
      }
    });
    this.mostrarVentanaConfiguracionMail = true;
  }

  public cerrarVentanaConfiguracionMail(): void {
    this.mostrarVentanaConfiguracionMail = false;
  }

  public getRutaMailActual(): string[] {
    return this.mapaRutasMail[this.tipoParametroMail] ?? [];
  }

  public agregarRutaMail(): void {
    if (!this.atributoRutaSeleccionado) {
      return;
    }
    this.mapaRutasMail = {
      ...this.mapaRutasMail,
      [this.tipoParametroMail]: [...this.getRutaMailActual(), this.atributoRutaSeleccionado],
    };
    this.atributoRutaSeleccionado = '';
  }

  public eliminarUltimoTramoRutaMail(): void {
    const ruta = this.getRutaMailActual();
    if (ruta.length <= 1) {
      return;
    }
    this.mapaRutasMail = { ...this.mapaRutasMail, [this.tipoParametroMail]: ruta.slice(0, -1) };
  }

  public guardarRutasParametrosMail(): void {
    const selected = this.getSelectedComponent();
    if (!selected) {
      return;
    }
    selected.mapaAtributos = JSON.stringify(this.mapaRutasMail);
    this.mostrarVentanaConfiguracionMail = false;
    this.addMensaje('Parámetros del correo guardados en el componente.');
  }

  // ---------------------------------------------------------------- Configuración LinkToDifferentForm

  public abrirVentanaConfiguracionLink(): void {
    const selected = this.getSelectedComponent();
    this.formulariosLinkAgregados = selected?.nombreFormulario
      ? selected.nombreFormulario.split(',').map((item) => item.trim()).filter(Boolean)
      : [];
    this.mostrarVentanaConfLinkToDifferentForm = true;
  }

  public cerrarVentanaConfiguracionLink(): void {
    this.mostrarVentanaConfLinkToDifferentForm = false;
  }

  public agregarFormularioLink(): void {
    const nombre = this.tipoFormularioEscogido === 'consulta'
      ? this.nombreFormularioConsultaLink
      : this.nombreFormularioLink;
    if (!nombre || this.formulariosLinkAgregados.includes(nombre)) {
      return;
    }
    this.formulariosLinkAgregados = [...this.formulariosLinkAgregados, nombre];
  }

  public eliminarFormularioLink(nombre: string): void {
    this.formulariosLinkAgregados = this.formulariosLinkAgregados.filter((item) => item !== nombre);
  }

  public guardarFormulariosLink(): void {
    const selected = this.getSelectedComponent();
    if (selected) {
      selected.nombreFormulario = this.formulariosLinkAgregados.join(',');
    }
    this.mostrarVentanaConfLinkToDifferentForm = false;
  }

  // ---------------------------------------------------------------- Ayuda y organización de secciones

  public abrirVentanaAyuda(): void {
    this.mostrarVentanaAyuda = true;
  }

  public cerrarVentanaAyuda(): void {
    this.mostrarVentanaAyuda = false;
  }

  public abrirVentanaOrganizacionSecciones(): void {
    this.mostrarVentanaOrganizacionSecciones = true;
  }

  public cerrarVentanaOrganizacionSecciones(): void {
    this.mostrarVentanaOrganizacionSecciones = false;
  }

  public moverSeccion(sectionKey: string, direccion: -1 | 1): void {
    const entries = Object.entries(this.formulario.seccionesFormulario ?? {});
    const indice = entries.findIndex(([key]) => key === sectionKey);
    const destino = indice + direccion;
    if (indice < 0 || destino < 0 || destino >= entries.length) {
      return;
    }
    [entries[indice], entries[destino]] = [entries[destino], entries[indice]];
    this.formulario = { ...this.formulario, seccionesFormulario: Object.fromEntries(entries) };
    this.cdr.detectChanges();
  }

  // ---------------------------------------------------------------- Ventana de selección de entidad foránea

  public abrirVentanaSeleccionEntidad(nombreEntidad: string, columna: ColumnaEntidadEntity): void {
    if (!columna.esLlaveForanea || !columna.entidadRelacionada) {
      return;
    }

    this.columnaForaneaOrigen = `${nombreEntidad}|${columna.nombre}`;
    this.mensajeCondiciones = '';
    this.whereEntidad = '';
    this.condicionesEntidad = [];
    this.columnasMostrablesSeleccionadas = {};

    this.entidadCatalogoService.getEntidadPorNombre(columna.entidadRelacionada).subscribe((entidad) => {
      this.entidadForaneaSeleccionada = entidad ?? null;
      (entidad?.columnas ?? []).forEach((item) => (this.columnasMostrablesSeleccionadas[item.nombre] = false));
      this.mostrarVentanaSeleccionEntidad = true;
      this.cdr.detectChanges();
    });
  }

  public agregarCondicionEntidad(columna: ColumnaEntidadEntity): void {
    const existentes = this.condicionesEntidad.filter((item) => item.atributo === columna.nombre).length;
    this.condicionesEntidad = [
      ...this.condicionesEntidad,
      {
        identificador: `-${columna.nombre}${existentes + 1}-`,
        atributo: columna.nombre,
        operador: '=',
        valor: '',
      },
    ];
  }

  public eliminarCondicionEntidad(identificador: string): void {
    this.condicionesEntidad = this.condicionesEntidad.filter((item) => item.identificador !== identificador);
  }

  public cerrarVentanaSeleccionEntidad(): void {
    this.mensajeCondiciones = '';
    if (this.condicionesEntidad.length > 0 && !this.whereEntidad.trim()) {
      this.mensajeCondiciones = 'Debe digitar la sentencia WHERE para las condiciones seleccionadas';
      return;
    }

    const selected = this.getSelectedComponent();
    if (selected && this.entidadForaneaSeleccionada) {
      const labels = Object.keys(this.columnasMostrablesSeleccionadas).filter(
        (nombre) => this.columnasMostrablesSeleccionadas[nombre],
      );
      selected.idColumna = this.columnaForaneaOrigen;
      selected.query = `SELECT model FROM ${this.entidadForaneaSeleccionada.nombre} as model`;
      selected.where = this.whereEntidad;
      selected.listaLabels = labels.join(',');
      selected.condiciones = this.condicionesEntidad.length ? JSON.stringify(this.condicionesEntidad) : '';
    }

    this.mostrarVentanaSeleccionEntidad = false;
  }

  // ---------------------------------------------------------------- Acciones globales del formulario

  public verFormulario(): void {
    this.addMensaje('Vista previa disponible en la zona de diseño de esta misma pantalla.');
  }

  public crearCopiaFormulario(): void {
    if (!this.formulario.nombreUnicoFormulario) {
      this.addMensaje('Debe escribir un nombre único antes de crear una copia.');
      return;
    }
    this.formulario = {
      ...this.formulario,
      id: undefined,
      nombreUnicoFormulario: `${this.formulario.nombreUnicoFormulario}_copia`,
    };
    this.guardarFormulario();
  }

  public limpiarCampos(): void {
    this.mensajes = [];
    this.mensaje = '';
    this.mensajeValidaciones = '';
    this.mensajesObservadores = [];
    this.validacionExp = this.createValidacionDraft();
    this.atributoSeleccionado = null;
    this.selectedComponentKey = '';
  }

  public volver(): void {
    this.addMensaje('Regresar al listado de formularios (navegación pendiente de integrar).');
  }

  /** validarCamposObligatorios del bean: título y nombre único con el patrón heredado. */
  public validarCamposObligatorios(): boolean {
    this.mensajes = [];
    if (!this.formulario.titulo) {
      this.addMensaje('Debe escribir un título para el formulario');
      return false;
    }
    if (!this.formulario.nombreUnicoFormulario) {
      this.addMensaje('Debe escribir un nombre único que identifique al formulario');
      return false;
    }
    if (!/^[a-zA-Z\-_0-9]+$/.test(this.formulario.nombreUnicoFormulario)) {
      this.addMensaje('El nombre único del formulario solo puede tener caracteres de la a-z, A-Z, 0-9, "-" ó "_".');
      return false;
    }
    if (!this.formulario.entidadPrincipal) {
      this.addMensaje('Debe seleccionar la entidad principal del formulario');
      return false;
    }
    return true;
  }

  private buildComponentEntity(componentType: string, componentKey: string): ComponenteBaseEntity {
    return {
      cambiado: 'false',
      observadores: '',
      nombre: componentKey,
      tipoDato: 'text',
      tipoComponente: componentType,
      descripcion: '',
      ultimoId: '',
      obligatorio: 'false',
      obligatorioFuncional: 'false',
      readOnly: 'false',
      guardado: 'false',
      cumpleValidaciones: 'true',
      opcionExtra: 'false',
      integerType: 'false',
      textType: ['InPutText', 'InPutTextArea'].includes(componentType) ? 'true' : 'false',
      dateType: componentType === 'SelectInPutDate' ? 'true' : 'false',
      separadorType: componentType === 'Separador' ? 'true' : 'false',
      checkBoxType: componentType === 'SelectBooleanCheckBox' ? 'true' : 'false',
      textAreaType: componentType === 'InPutTextArea' ? 'true' : 'false',
      listBoxType: componentType === 'SelectOneListBox' ? 'true' : 'false',
      listBoxCustomizedType: componentType === 'SelectOneListBoxCustomized' ? 'true' : 'false',
      radioButtonType: componentType === 'SelectOneRadioButton' ? 'true' : 'false',
      listCompuestaType: componentType === 'ListaCompuesta' ? 'true' : 'false',
      grillaType: componentType === 'TablaDetalles' ? 'true' : 'false',
      labelType: componentType === 'Label' ? 'true' : 'false',
      cargaMasivaType: componentType === 'CargaMasiva' ? 'true' : 'false',
      mailType: componentType === 'Mail' ? 'true' : 'false',
      searchButtonType: componentType === 'SearchButton' ? 'true' : 'false',
      refreshButtonType: componentType === 'RefreshButton' ? 'true' : 'false',
      saveButtonType: componentType === 'SaveButton' ? 'true' : 'false',
      linkType: ['OutPutLink', 'LinkToAForm', 'LinkToDifferentForm', 'LinkFormToIfaces'].includes(componentType)
        ? 'true'
        : 'false',
      linkToAFormType: componentType === 'LinkToAForm' ? 'true' : 'false',
      linkToDifferentFormType: componentType === 'LinkToDifferentForm' ? 'true' : 'false',
      linkFormToIfacesType: componentType === 'LinkFormToIfaces' ? 'true' : 'false',
      validacionesExpresiones: '',
      style: `width:${this.defaultFieldWidth}%;`,
      styleClass: '',
      styleContenedor: `width:${this.defaultContainerWidth}%;`,
      styleClassContenedor: '',
      columnClasses: `width${this.defaultLabelWidth},width${this.defaultFieldColumnWidth}`,
      claseEstilo: componentType,
      visible: 'true',
      filtro: 'false',
      relacionObservadorColumna: '',
      tablaDetalleType: componentType === 'TablaDetalles' ? 'true' : 'false',
      richTextType: componentType === 'InPutRichText' ? 'true' : 'false',
      soloTexto: 'false',
      estaSujeto: 'false',
      esOrigenValidacion: 'false',
      componentesRelacionados: '',
      componentesNuevaValidacionEntreComponentes: '',
      arbolesExpresionNuevaValidacionEntreComponentes: '',
      operadorAritmetico: '',
      query: '',
      select: '',
      where: '',
      whereTemp: '',
      whereCon: '',
      condiciones: '',
      listaAtributosResticcion: '',
      mapaCondiciones: '',
      consultaGenerica: '',
      listaIdentificadores: '',
      listaLabels: '',
      labelOrganizable: '',
      mapaAtributos: '',
      orderBy: '',
      pagSize: '',
      orientacion: componentType === 'SelectOneRadioButton' ? 'lineDirection' : '',
      mostrarLink: 'false',
      utilizaImagen: 'false',
      nombreEntidad: '',
      nombreFormulario: '',
      nombreFormularioEdicion: '',
      mostrarBotonAgregar: 'false',
      mostrarBotonBuscar: 'false',
      mostrarBotonEliminar: 'false',
      cantidadMinima: '',
      mensajeError: '',
      posicionesNombres: {},
      formatosColumnas: {},
      nombresOrganizados: {},
      nombresColumnas: {},
      nombresColumnasTabla: {},
      listValuesForSortQuery: {},
      valueSelectedSort: '',
      textoHTMLTabla: '',
      archivoConfString: '',
      nameArchivoConf: '',
      nombreClaseCarga: '',
      atributosSeleccionadosTransportar: [],
      nombreAtributoLista: '',
      nombreAtributoSeleccionado: '',
    };
  }

  private createDefaultForm(): FormularioJSONEntity {
    return {
      titulo: 'Formulario capturado',
      nombreUnicoFormulario: '',
      descripcion: 'Diseño de formulario de captura',
      seccionesFormulario: {},
      entidades: {},
      entidadPrincipal: '',
      entidadesRelacionadas: {},
      idFormularioPadre: 'vacio',
      nuevo: 'false',
      edicion: 'false',
      eliminable: 'false',
      diligenciable: 'true',
      consultable: 'false',
      plantillasMostrables: 'false',
      htmlAyuda: '',
    };
  }
}
