import { PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-de-pessoas',
  templateUrl: './lista-de-pessoas.component.html',
  styleUrls: ['./lista-de-pessoas.component.css']
})
export class ListaDePessoasComponent implements OnInit {
  excluir_ok = false;
  excluir_erro = false;
  pessoas = [];

  constructor(private pessoasService: PessoasService) { }


  ngOnInit() {
    this.atualizarLista();
  }

  excluir(pessoa){
    if(confirm('Tem certeza que deseja excluir a disciplina' + pessoa.nome + '?')){
      this.pessoasService.deletePessoa(pessoa.id)
      .subscribe(pk =>{
        this.excluir_ok = true;
        this.excluir_erro = false;
        this.atualizarLista();
      }, erro => {
        this.excluir_ok = false;
        this.excluir_erro = true;
      });
    }
  }

  atualizarLista(){
    this.pessoasService.getPessoas()
    .subscribe(pessoas => this.pessoas = pessoas);
  }
  
    
}
