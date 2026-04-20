import { Component, Input } from '@angular/core';
import { SearchButtonEntity } from '../../../../entidades/forms-captura/search-button.entity';
import { PlantillaFormCapturaComponent } from '../plantilla-form-captura.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'frm-search-button',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './search-button.component.html',
  styleUrl: './search-button.component.scss',
})
export class SearchButtonComponent {
  @Input() public searchButtonEntity?: SearchButtonEntity;
  @Input() public verFormularioCmp?: PlantillaFormCapturaComponent;

  public constructor() {}

  ngOnInit(): void {
    console.debug('Search Button', this.searchButtonEntity);
  }

  public click() {
    console.debug('Click en Search Button. Accion:', this.searchButtonEntity?.expresionLogicaFiltro);
  }
}
