import { Component, DestroyRef, OnInit } from '@angular/core';
import type { Pensamento } from '../pensamento/pensamento.model';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  standalone: false,
  templateUrl: './listar-pensamento.component.html',
  styleUrl: './listar-pensamento.component.css'
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];

  constructor(
    private service: PensamentoService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    const subscription = this.service.listar().subscribe({
      next: (pensamentos) => {
        this.listaPensamentos = pensamentos
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

}
