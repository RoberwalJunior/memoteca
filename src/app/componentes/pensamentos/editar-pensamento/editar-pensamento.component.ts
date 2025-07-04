import { Component, DestroyRef, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento.model';
import { PensamentoService } from '../pensamento.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-pensamento',
  standalone: false,
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css'
})
export class EditarPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: '',
    conteudo: '',
    autoria: '',
    modelo: 'modelo1'
  };

  constructor(
    private service: PensamentoService,
    private destroyRef: DestroyRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  editarPensamento() {
    this.service.editar(this.pensamento).subscribe({
      complete: () => {
        this.router.navigate(['listarPensamento']);
      }
    })
  }
}
