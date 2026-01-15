import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VerFormularioComponent } from '../ver-formulario.component';
import { SelectBooleanCheckBoxEntity } from '../../entities/ver-formulario/select-boolean-checkbox.entity';

@Component({
  selector: 'frm-select-boolean-check-box',
  imports: [MatCheckboxModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './select-boolean-check-box.component.html',
  styleUrl: './select-boolean-check-box.component.scss',
})
export class SelectBooleanCheckBoxComponent {
  @Input() public selectBooleanCheckBoxEntity?: SelectBooleanCheckBoxEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Select Boolean Checkbox:', this.selectBooleanCheckBoxEntity);
  }

  public update(value: boolean) {
    //TODO Completar
  }

  public partiallyComplete(): unknown {
    //TODO Completar
    return null;
  }
}
