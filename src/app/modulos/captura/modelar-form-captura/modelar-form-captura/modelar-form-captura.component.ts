import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioJSONEntity } from '../../../../entidades/forms-captura/formulario-json.entity';
import { SeccionEntity } from '../../../../entidades/forms-captura/seccion.entity';
import { ComponenteBaseEntity } from '../../../../entidades/forms-captura/componente-base.entity';
import { ComponentesComponent } from '../../plantilla-form-captura/componentes/componentes.component';
import { PlantillaFormCapturaService } from '../../plantilla-form-captura/plantilla-form-captura.service';
import { MessageUtil } from '../../../../utilidades/message.util';

@Component({
  selector: 'app-modelar-form-captura',
  imports: [CommonModule, FormsModule, ComponentesComponent],
  templateUrl: './modelar-form-captura.component.html',
  styleUrl: './modelar-form-captura.component.scss',
})
export class ModelarFormCapturaComponent {
  public mensaje = '';
  public mensajes: string[] = [];

  public constructor(
    private cdr: ChangeDetectorRef,
    private plantillaFormCapturaService: PlantillaFormCapturaService,
  ) {}
  public formulario: FormularioJSONEntity = this.createDefaultForm();
  public selectedSectionKey = '';
  public selectedComponentKey = '';
  public selectedComponentType = 'InPutText';
  public draggedComponentType = '';
  public activeDropSectionKey = '';
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
    this.cdr.detectChanges();
  }

  public addComponentToSelectedSection(): void {
    if (!this.selectedSectionKey) {
      return;
    }

    this.addComponentToSection(this.selectedSectionKey, this.selectedComponentType);
  }

  public addComponentToSection(sectionKey: string, componentType: string): string | null {
    if (!sectionKey) {
      return null;
    }

    const section = this.formulario.seccionesFormulario?.[sectionKey];
    if (!section) {
      return null;
    }

    const componentKey = `Componente_${Object.keys(section.componentesIzq ?? {}).length + 1}`;
    const component = this.buildComponentEntity(componentType, componentKey);

    const updatedSection: SeccionEntity = {
      ...section,
      componentesIzq: {
        ...(section.componentesIzq ?? {}),
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

  public selectComponent(key: string): void {
    this.selectedComponentKey = key;
  }

  public reorderComponent(event: { sourceKey: string; targetKey: string; sectionKey: string }): void {
    this.moveComponentInSection(event.sectionKey, event.sourceKey, event.targetKey);
    this.selectedComponentKey = event.targetKey;
    this.cdr.detectChanges();
  }

  public moveComponentInSection(sectionKey: string, sourceKey: string, targetKey: string): void {
    const section = this.formulario.seccionesFormulario?.[sectionKey];
    const components = section?.componentesIzq;
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
      componentesIzq: reorderedComponents,
    };

    this.formulario = {
      ...this.formulario,
      seccionesFormulario: {
        ...(this.formulario.seccionesFormulario ?? {}),
        [sectionKey]: updatedSection,
      },
    };
    this.cdr.detectChanges();
  }

  public getSelectedComponent(): ComponenteBaseEntity | null {
    if (!this.selectedSectionKey || !this.selectedComponentKey) {
      return null;
    }

    const section = this.formulario.seccionesFormulario?.[this.selectedSectionKey];
    const components = section?.componentesIzq;
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

    (selected as unknown as Record<string, unknown>)[property] = value;
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
    if (!this.formulario) {
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

    const components = section.componentesIzq;
    if (!components || typeof components === 'string') {
      return [];
    }

    return Object.entries(components as Record<string, ComponenteBaseEntity | undefined>).map(
      ([key, value]) => ({
        key,
        value: value as ComponenteBaseEntity,
      }),
    );
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
      linkFormToIfacesType: componentType === 'LinkFormToIfaces' ? 'true' : 'false',
      validacionesExpresiones: '',
      style: '',
      styleClass: '',
      styleContenedor: '',
      styleClassContenedor: '',
      columnClasses: '',
      claseEstilo: componentType,
      visible: 'true',
      filtro: 'false',
      relacionObservadorColumna: '',
      tablaDetalleType: componentType === 'TablaDetalles' ? 'true' : 'false',
      richTextType: componentType === 'InPutRichText' ? 'true' : 'false',
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
    };
  }

  private createDefaultForm(): FormularioJSONEntity {
    return {
      titulo: 'Formulario capturado',
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
