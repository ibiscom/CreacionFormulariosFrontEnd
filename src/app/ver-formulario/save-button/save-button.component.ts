import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { VerFormularioComponent } from '../ver-formulario.component';
import { SaveButtonEntity } from '../../entities/ver-formulario/save-button.entity';

@Component({
  selector: 'frm-save-button',
  imports: [MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  @Input() public saveButtonEntity?: SaveButtonEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Save Button', this.saveButtonEntity);
  }

  public click() {
    console.log('Click en Save Button. Accion:', this.saveButtonEntity?.expresionLogicaFiltro);
  }
}
