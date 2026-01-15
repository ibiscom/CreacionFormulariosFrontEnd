import { Component, Input } from '@angular/core';
import { LinkToDifferentFormEntity } from '../../entities/ver-formulario/link-to-different-form';
import { VerFormularioComponent } from '../ver-formulario.component';

@Component({
  selector: 'frm-link-to-different-form',
  imports: [],
  templateUrl: './link-to-different-form.component.html',
  styleUrl: './link-to-different-form.component.scss',
})
export class LinkToDifferentFormComponent {
  @Input() public linkToDifferentFormEntity?: LinkToDifferentFormEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Link To Different Form:', this.linkToDifferentFormEntity);
  }
}
