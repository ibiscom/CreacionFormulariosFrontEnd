import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { SelectBooleanCheckBoxEntity } from '../../../../entidades/forms-captura/select-boolean-checkbox.entity';

@Component({
  selector: 'frm-select-boolean-check-box',
  imports: [MatCheckboxModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './select-boolean-check-box.component.html',
  styleUrl: './select-boolean-check-box.component.scss',
})
export class SelectBooleanCheckBoxComponent {
  @Input() public selectBooleanCheckBoxEntity?: SelectBooleanCheckBoxEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Select Boolean Checkbox:', this.selectBooleanCheckBoxEntity);
  }

  public update(value: boolean) {
    //TODO Completar
  }

  public partiallyComplete(): unknown {
    //TODO Completar
    return null;
  }
}
