import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RefreshButtonEntity } from '../../entities/ver-formulario/refresh-button.entity';


@Component({
  selector: 'frm-refresh-button',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './refresh-button.component.html',
  styleUrl: './refresh-button.component.scss',
})
export class RefreshButtonComponent {
  @Input() public refreshButtonEntity?: RefreshButtonEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Refresh Button', this.refreshButtonEntity);
  }

  public click() {
    console.log('Click en Refresh Button. Accion:', this.refreshButtonEntity?.expresionLogicaFiltro);
  }
}

