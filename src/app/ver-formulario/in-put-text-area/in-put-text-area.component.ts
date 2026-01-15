import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InPutTextAreaEntity } from '../../entities/ver-formulario/in-put-text-area.entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'frm-in-put-text-area',
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './in-put-text-area.component.html',
  styleUrl: './in-put-text-area.component.scss',
})
export class InPutTextAreaComponent {
  @Input() public inPutTextAreaEntity?: InPutTextAreaEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Input Text Area:', this.inPutTextAreaEntity);
    this.colocarValorInicial();
  }

  private colocarValorInicial(): void {
    //Valor por defecto
    if( this.inPutTextAreaEntity && this.inPutTextAreaEntity.valor && this.inPutTextAreaEntity.valor[''] === undefined){
      if(this.inPutTextAreaEntity.valorDefecto && this.inPutTextAreaEntity.valorDefecto[''] !== undefined){
        this.inPutTextAreaEntity.valor[''] = this.inPutTextAreaEntity.valorDefecto[''];
      }
      else {
        this.inPutTextAreaEntity.valor[''] = '';
      }
    }
  }
}
