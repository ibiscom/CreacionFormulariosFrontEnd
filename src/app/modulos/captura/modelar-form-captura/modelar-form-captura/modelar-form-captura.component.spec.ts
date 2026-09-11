import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelarFormCapturaComponent } from './modelar-form-captura.component';

describe('ModelarFormCapturaComponent', () => {
  let component: ModelarFormCapturaComponent;
  let fixture: ComponentFixture<ModelarFormCapturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelarFormCapturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelarFormCapturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize a form model and allow adding sections', () => {
    expect(component.formulario.titulo).toContain('Formulario');

    component.addSection();

    const sections = Object.values(component.formulario.seccionesFormulario ?? {});
    expect(sections.length).toBe(1);
  });

  it('should create a component with a JSF-compatible type when requested', () => {
    component.addSection();
    component.selectedComponentType = 'TablaDetalles';
    component.addComponentToSelectedSection();

    const section = component.formulario.seccionesFormulario?.[component.selectedSectionKey];
    const addedComponent = Object.values(section?.componentesIzq ?? {})[0] as {
      tipoComponente: string;
    };

    expect(addedComponent.tipoComponente).toBe('TablaDetalles');
  });

  it('should add a component when dropping it into a section', () => {
    component.addSection();
    const event = {
      dataTransfer: {
        getData: jasmine.createSpy('getData').and.returnValue('InPutText'),
      },
      preventDefault: jasmine.createSpy('preventDefault'),
    } as unknown as DragEvent;

    component.dropComponent('Seccion_1', event);

    const section = component.formulario.seccionesFormulario?.['Seccion_1'];
    const addedComponent = Object.values(section?.componentesIzq ?? {})[0] as {
      tipoComponente: string;
    };

    expect(addedComponent.tipoComponente).toBe('InPutText');
  });

  it('should update the selected component properties from the editor panel', () => {
    component.addSection();
    component.addComponentToSelectedSection();
    component.selectComponent(component.selectedComponentKey);

    component.updateSelectedComponentProperty('nombre', 'Campo nuevo');
    component.updateSelectedComponentProperty('descripcion', 'Descripción editada');

    const selected = component.getSelectedComponent();
    expect(selected?.nombre).toBe('Campo nuevo');
    expect(selected?.descripcion).toBe('Descripción editada');
  });

  it('should initialize legacy query fields for new components', () => {
    component.addSection();
    component.addComponentToSelectedSection();

    const selected = component.getSelectedComponent();
    expect(selected?.query).toBe('');
    expect(selected?.select).toBe('');
    expect(selected?.where).toBe('');
  });

  it('should apply the legacy default layout when creating a component', () => {
    component.addSection();
    component.addComponentToSelectedSection();

    const selected = component.getSelectedComponent();
    expect(selected?.style).toBe('width:90%;');
    expect(selected?.styleContenedor).toBe('width:50%;');
    expect(selected?.columnClasses).toBe('width30,width70');
    expect(component.getSelectedComponentWidth('container')).toBe('50');
    expect(component.getSelectedComponentWidth('field')).toBe('90');
    expect(component.getSelectedComponentColumnWidth('label')).toBe('30');
    expect(component.getSelectedComponentColumnWidth('field')).toBe('70');
  });

  it('should prioritize layout values received in the JSON over screen defaults', () => {
    component.addSection();
    component.addComponentToSelectedSection();

    const selected = component.getSelectedComponent()!;
    selected.style = 'width:65%;height:240px;';
    selected.styleContenedor = 'width:40%;height:180px;';
    selected.columnClasses = 'width20,width80';

    expect(component.getSelectedComponentWidth('container')).toBe('40');
    expect(component.getSelectedComponentHeight('container')).toBe('180');
    expect(component.getSelectedComponentWidth('field')).toBe('65');
    expect(component.getSelectedComponentHeight('field')).toBe('240');
    expect(component.getSelectedComponentColumnWidth('label')).toBe('20');
    expect(component.getSelectedComponentColumnWidth('field')).toBe('80');
  });

  it('should save a logical validation using the legacy component fields', () => {
    component.addSection();
    component.addComponentToSelectedSection();
    const baseKey = component.selectedComponentKey;
    component.selectedComponentType = 'InPutTextArea';
    component.addComponentToSelectedSection();
    const relatedKey = component.selectedComponentKey;

    component.setValidationBaseComponent(baseKey);
    component.validationAttributeKey = relatedKey;
    component.validationAttributeValue = 'ACTIVO';
    component.addValidationAttribute();
    component.validationErrorMessage = 'La condición no se cumple.';
    component.toggleValidationBlockedComponent(relatedKey);
    component.saveLogicalValidation();

    component.selectComponent(baseKey);
    const base = component.getSelectedComponent();
    expect(base?.componentesNuevaValidacionEntreComponentes).toBe(`${relatedKey}=[ACTIVO]`);
    expect(base?.componentesRelacionados).toBe(relatedKey);
    expect(base?.esOrigenValidacion).toBe('true');
    expect(base?.arbolesExpresionNuevaValidacionEntreComponentes).toContain('La condición no se cumple.');
  });

  it('should move the dragged component after the target component', () => {
    component.addSection();
    component.addComponentToSelectedSection();
    component.selectedComponentType = 'Label';
    component.addComponentToSelectedSection();

    const section = component.formulario.seccionesFormulario?.['Seccion_1'];
    const keys = Object.keys(section?.componentesIzq ?? {});

    component.moveComponentInSection('Seccion_1', keys[0], keys[1]);
    const reorderedKeys = Object.keys(section?.componentesIzq ?? {});

    expect(reorderedKeys[0]).toBe(keys[1]);
    expect(reorderedKeys[1]).toBe(keys[0]);
  });
});
