import { Component, DestroyRef, OnInit } from '@angular/core';
import type { Pensamento } from '../pensamento/pensamento.model';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-pensamento',
  standalone: false,
  templateUrl: './criar-pensamento.component.html',
  styleUrl: './criar-pensamento.component.css'
})
export class CriarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    conteudo: 'Aprendendo Angular',
    autoria: 'Dev',
    modelo: 'modelo1'
  }

  constructor(
    private service: PensamentoService,
    private destroyRef: DestroyRef,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  criarPensamento() {
    const subscription = this.service.criar(this.pensamento).subscribe({
      complete: () => {
        this.router.navigate(['listarPensamento']);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
