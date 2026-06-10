import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { LinkToAFormEntity } from '../../../../entidades/forms-captura/link-to-a-form';
import { getFieldPayloadValue } from '../../../../utilidades/field-value.util';

@Component({
  selector: 'frm-link-to-a-form',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './link-to-a-form.component.html',
  styleUrl: './link-to-a-form.component.scss',
})
export class LinkToAFormComponent {
  @Input() public linkToAFormEntity?: LinkToAFormEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Link To A Form:', this.linkToAFormEntity);
  }

  public get hrefValue(): string {
    return String(getFieldPayloadValue(this.linkToAFormEntity?.valor) ?? '');
  }
}
