import { Component, Input } from '@angular/core';
import { SearchButtonEntity } from '../../entities/ver-formulario/search-button.entity';
import { VerFormularioComponent } from '../ver-formulario.component';
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
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Search Button', this.searchButtonEntity);
  }

  public click() {
    console.log('Click en Search Button. Accion:', this.searchButtonEntity?.expresionLogicaFiltro);
  }
}
