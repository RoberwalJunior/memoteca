import { Component, Input } from '@angular/core';
import type { Pensamento } from './pensamento.model';

@Component({
  selector: 'app-pensamento',
  standalone: false,
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})
export class PensamentoComponent {
  @Input({ required: true }) pensamento!: Pensamento;

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256)
      return 'pensamento-g';
    return 'pensamento-p';
  }
}
