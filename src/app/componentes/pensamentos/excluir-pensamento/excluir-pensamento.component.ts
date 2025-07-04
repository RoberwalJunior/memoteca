import { Component, DestroyRef, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento.model';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-excluir-pensamento',
  standalone: false,
  templateUrl: './excluir-pensamento.component.html',
  styleUrl: './excluir-pensamento.component.css'
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento?: Pensamento;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;
    const subscription = this.service.buscarPorId(id).subscribe({
      next: (pensamento) => {
        this.pensamento = pensamento;
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  excluirPensamento() {
    if (this.pensamento && this.pensamento.id) {
      this.service.excluir(this.pensamento?.id).subscribe({
        complete: () => {
          this.router.navigate(['listarPensamento']);
        }
      });
    }
  }
}
