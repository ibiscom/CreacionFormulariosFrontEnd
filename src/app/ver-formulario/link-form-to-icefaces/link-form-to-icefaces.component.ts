import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { LinkFormToIcefacesEntity } from '../../entities/ver-formulario/link-form-to-icefaces.entity';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'frm-link-form-to-icefaces',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './link-form-to-icefaces.component.html',
  styleUrl: './link-form-to-icefaces.component.scss',
})
export class LinkFormToIcefacesComponent {
  @Input() public linkFormToIcefacesEntity?: LinkFormToIcefacesEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Link Form to Icefaces:', this.linkFormToIcefacesEntity);
  }
}
