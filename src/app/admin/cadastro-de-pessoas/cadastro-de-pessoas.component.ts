import { ActivatedRoute } from '@angular/router';
import { PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-de-pessoas',
  templateUrl: './cadastro-de-pessoas.component.html',
  styleUrls: ['./cadastro-de-pessoas.component.css']
})
export class CadastroDePessoasComponent implements OnInit {
id = null;
codigo = null;
dtNascimento = null;
nome = null;
cadastro_ok = false;
cadastro_erro = false;
atualizar_ok = false;
atualizar_erro = false;

  constructor(private pessoasService: PessoasService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.id){
      this.pessoasService.getPessoa(this.id)
      .subscribe(pessoa => {
        this.codigo = pessoa.id;
        this.nome = pessoa.nome;
        this.dtNascimento = pessoa.dtNascimento;
      } );
    }
  }

  salvar(){
    if(this.id){
      this.pessoasService.updatePessoa(this.id, this.nome, this.dtNascimento)
      .subscribe(pessoa => {
        this.atualizar_ok = true;
        this.atualizar_erro = false;
      },
      erro => {
        this.atualizar_ok = false;
        this.atualizar_erro  = true;
      }
     );
    }
    else{
      this.pessoasService.addPessoa(this.id, this.nome, this.dtNascimento)
      .subscribe(pessoa => {
        this.cadastro_ok = true;
        this.cadastro_erro = false;
        this.codigo = null;
        this.nome = null;
        this.dtNascimento = null;
      },
      erro => {
        this.cadastro_ok = false;
        this.cadastro_erro = true;
      }
     );
    }
  }
}
