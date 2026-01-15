import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LinkToAFormEntity } from '../../entities/ver-formulario/link-to-a-form';
import { VerFormularioComponent } from '../ver-formulario.component';

@Component({
  selector: 'frm-link-to-a-form',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './link-to-a-form.component.html',
  styleUrl: './link-to-a-form.component.scss',
})
export class LinkToAFormComponent {
  @Input() public linkToAFormEntity?: LinkToAFormEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Link To A Form:', this.linkToAFormEntity);
  }
}
