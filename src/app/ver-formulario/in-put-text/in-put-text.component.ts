import { Component, Input } from '@angular/core';
import { ComponenteBaseEntity } from '../../entities/ver-formulario/componente-base.entity';
import { VerFormularioComponent } from '../ver-formulario.component';
import { InPutTextEntity } from '../../entities/ver-formulario/in-put-text.entity';
import { MatFormField, MatInputModule } from '@angular/material/input';
@Component({
  selector: 'frm-in-put-text',
  imports: [MatFormField, MatInputModule],
  templateUrl: './in-put-text.component.html',
  styleUrl: './in-put-text.component.scss',
})
export class InPutTextComponent {
  @Input() public inPutTextEntity?: InPutTextEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Input Text:', this.inPutTextEntity);
    this.colocarValorInicial();
  }

  private colocarValorInicial(): void {
    //Valor por defecto
    if( this.inPutTextEntity && this.inPutTextEntity.valor && this.inPutTextEntity.valor[''] === undefined){
      if(this.inPutTextEntity.valorDefecto && this.inPutTextEntity.valorDefecto[''] !== undefined){
        this.inPutTextEntity.valor[''] = this.inPutTextEntity.valorDefecto[''];
      }
      else {
        this.inPutTextEntity.valor[''] = '';
      }
    }
  }

}
