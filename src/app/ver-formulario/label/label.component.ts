import { Component, Input } from '@angular/core';
import { LabelEntity } from '../../entities/ver-formulario/label-entity';
import { VerFormularioComponent } from '../ver-formulario.component';

@Component({
  selector: 'frm-label',
  imports: [],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelComponent {
  @Input() public labelEntity?: LabelEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Label:', this.labelEntity);
  }
}
