import { Component, OnInit } from '@angular/core';
import { FuncionariosService } from '../funcionarios.service';

@Component({
  selector: 'app-cadastro-de-funcionario',
  templateUrl: './cadastro-de-funcionario.component.html',
  styleUrls: ['./cadastro-de-funcionario.component.css']
})
export class CadastroDeFuncionarioComponent implements OnInit {

  tipo_cad: any;
  pessoa_cad: any;
  funcao_cad: any;
  cargo_cad: any;
  pessoas = [];
  funcoes = [];
  cargos = [];

  verificarPessoaId: any;
  verificarCargoId: any;
  verificarFuncaoId: any;

  constructor(private funcionariosService: FuncionariosService) {
    this.funcionariosService.getPessoas()
      .subscribe(pessoas => this.pessoas = pessoas);

    this.funcionariosService.getCargos()
      .subscribe(cargos => this.cargos = cargos);


    this.funcionariosService.getFuncoes()
      .subscribe(funcoes => this.funcoes = funcoes);

  }

  ngOnInit() {
  }

  tipo() {
    console.log(this.tipo_cad);
    
    if (this.tipo_cad == "Administrativo") {
      if (this.verificar()) {
        
        this.verificarPessoaId = this.pessoaId();
        this.verificarCargoId = this.cargoId();
        console.log();
        
        this.funcionariosService.addAdministrativo(this.verificarPessoaId, this.verificarCargoId)
          .subscribe(administrativo => console.log(administrativo));
        for (var i = 0; i < this.funcao_cad.length; i++) {
          this.funcionariosService.addFuncionarioCargoFuncoes(this.verificarPessoaId, this.verificarCargoId, this.funcaoId(this.funcao_cad[i]))
        }
        console.log("É um Array de Função ok!");
      }
      else {
        this.verificarCargoId = this.cargoId();
        this.verificarPessoaId = this.pessoaId();
        this.funcionariosService.addAdministrativo(this.verificarPessoaId, this.verificarCargoId)
        .subscribe(administrativo => console.log(administrativo));
        this.funcionariosService.addFuncionarioCargoFuncoes(this.verificarPessoaId, this.verificarCargoId, this.funcaoId(this.funcao_cad));
        this.verificarFuncaoId = this.funcaoId(this.funcao_cad)
      }

    }
    if (this.tipo_cad == "Docente") {
      if (this.verificar()) {
        this.verificarPessoaId = this.pessoaId();
        this.verificarCargoId = this.cargoId();
        this.funcionariosService.addDocente(this.verificarPessoaId, this.verificarCargoId);
        for (var i = 0; i < this.funcao_cad.length; i++) {
          this.funcionariosService.addFuncionarioCargoFuncoes(this.verificarPessoaId, this.verificarCargoId, this.funcaoId(this.funcao_cad[i]))
        }
        console.log("É um Array de Função ok!");
      }
      else {
        this.verificarCargoId = this.cargoId();
        this.verificarPessoaId = this.pessoaId();
        this.funcionariosService.addDocente(this.verificarPessoaId, this.verificarCargoId);
        this.funcionariosService.addFuncionarioCargoFuncoes(this.verificarPessoaId, this.verificarCargoId, this.funcaoId(this.funcao_cad));
        this.verificarFuncaoId = this.funcaoId(this.funcao_cad)
      }
    }
  }

  pessoaId() {
    for (let pessoa of this.pessoas) {
      if (pessoa.nome == this.pessoa_cad) {
        return pessoa.id
      }
    }
  }

  cargoId() {
    for (let cargo of this.cargos) {
      if (cargo.nome == this.cargo_cad) {
        return cargo.id
      }
    }
  }

  funcaoId(funcao1) {
    for (let funcao of this.funcoes) {
      if (funcao.nome == funcao1) {
        return funcao.id
      }
    }
  }

  verificar() {
    for (let funcao of this.funcoes) {
      for (var i = 0; i < this.funcao_cad.length; i++) {
        if (funcao.nome == this.funcao_cad[i] && this.funcao_cad.length > 1) {
          console.log("O nome da funcao é igual " + funcao.nome + " a " + this.funcao_cad[i] + " é arrmbado do carlho");
          return true
        }
      }
    }
    return false
  }
}


