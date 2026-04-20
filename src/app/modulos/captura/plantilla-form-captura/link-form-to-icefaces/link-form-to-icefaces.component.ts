import { Component, Input } from '@angular/core';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LinkFormToIcefacesEntity } from '../../../../entidades/forms-captura/link-form-to-icefaces.entity';

@Component({
  selector: 'frm-link-form-to-icefaces',
  imports: [MatButtonModule, FormsModule],
  templateUrl: './link-form-to-icefaces.component.html',
  styleUrl: './link-form-to-icefaces.component.scss',
})
export class LinkFormToIcefacesComponent {
  @Input() public linkFormToIcefacesEntity?: LinkFormToIcefacesEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Link Form to Icefaces:', this.linkFormToIcefacesEntity);
  }
}
