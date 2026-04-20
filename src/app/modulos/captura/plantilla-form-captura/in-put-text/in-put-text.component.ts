import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { InPutTextEntity } from '../../../../entidades/forms-captura/in-put-text.entity';
@Component({
  selector: 'frm-in-put-text',
  imports: [MatFormField, MatInputModule],
  templateUrl: './in-put-text.component.html',
  styleUrl: './in-put-text.component.scss',
})
export class InPutTextComponent {
  @Input() public inPutTextEntity?: InPutTextEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Input Text:', this.inPutTextEntity);
    this.colocarValorInicial();
  }

  private colocarValorInicial(): void {
    //Valor por defecto
    if (
      this.inPutTextEntity &&
      this.inPutTextEntity.valor &&
      this.inPutTextEntity.valor[''] === undefined
    ) {
      if (
        this.inPutTextEntity.valorDefecto &&
        this.inPutTextEntity.valorDefecto[''] !== undefined
      ) {
        this.inPutTextEntity.valor[''] = this.inPutTextEntity.valorDefecto[''];
      } else {
        this.inPutTextEntity.valor[''] = '';
      }
    }
  }
}
