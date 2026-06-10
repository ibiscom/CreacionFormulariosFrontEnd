import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LinkToDifferentFormEntity } from '../../../../entidades/forms-captura/link-to-different-form';
import { getFieldPayloadValue } from '../../../../utilidades/field-value.util';

@Component({
  selector: 'frm-link-to-different-form',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './link-to-different-form.component.html',
  styleUrl: './link-to-different-form.component.scss',
})
export class LinkToDifferentFormComponent {
  @Input() public linkToDifferentFormEntity?: LinkToDifferentFormEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Link To Different Form:', this.linkToDifferentFormEntity);
  }

  public get hrefValue(): string {
    return String(getFieldPayloadValue(this.linkToDifferentFormEntity?.valor) ?? '');
  }
}
