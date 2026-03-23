import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { OutPutLinkEntity } from '../../entities/ver-formulario/out-put-link.entity';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'frm-out-put-link',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './out-put-link.component.html',
  styleUrl: './out-put-link.component.scss',
})
export class OutPutLinkComponent {
  @Input() public outPutLinkEntity?: OutPutLinkEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('OutPutLink:', this.outPutLinkEntity);
  }
}
