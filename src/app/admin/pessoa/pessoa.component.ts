import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../pessoas.service';
import { Route } from '@angular/router/src/config';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  pessoa;
  
    constructor(private pessoasService: PessoasService,
                private route: ActivatedRoute,
                private router: Router) {
    }
  
    ngOnInit() {
      const id = parseInt(this.route.snapshot.paramMap.get('id'));
     
      
      this.pessoasService.getPessoa(id)
        .subscribe(pessoa => this.pessoa = pessoa);

        console.log("Test tes te ste pessoa" + this.pessoa);
    }
}
