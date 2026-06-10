import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { OutPutLinkEntity } from '../../../../entidades/forms-captura/out-put-link.entity';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { getFieldPayloadValue } from '../../../../utilidades/field-value.util';

@Component({
  selector: 'frm-out-put-link',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './out-put-link.component.html',
  styleUrl: './out-put-link.component.scss',
})
export class OutPutLinkComponent {
  @Input() public outPutLinkEntity?: OutPutLinkEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('OutPutLink:', this.outPutLinkEntity);
  }

  public get hrefValue(): string {
    return String(getFieldPayloadValue(this.outPutLinkEntity?.valor) ?? '');
  }
}
