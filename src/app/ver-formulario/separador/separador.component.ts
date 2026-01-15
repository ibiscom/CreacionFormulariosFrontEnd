import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { SeparadorEntity } from '../../entities/ver-formulario/separador.entity';

@Component({
  selector: 'frm-separador',
  imports: [],
  templateUrl: './separador.component.html',
  styleUrl: './separador.component.scss',
})
export class SeparadorComponent {
  @Input() public separadorEntity?: SeparadorEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Separador:', this.separadorEntity);
  }
}
