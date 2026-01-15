import { Component, Input } from '@angular/core';
import { VerFormularioComponent } from '../ver-formulario.component';
import { MailEntity } from '../../entities/ver-formulario/mail.entity';

@Component({
  selector: 'frm-mail',
  imports: [],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.scss',
})
export class MailComponent {
  @Input() public mailEntity?: MailEntity;
  @Input() public verFormularioCmp?: VerFormularioComponent;

  public constructor() {}

  ngOnInit(): void {
    console.log('Mail:', this.mailEntity);
  }
}
