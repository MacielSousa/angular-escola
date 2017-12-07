import {Component, OnInit} from '@angular/core';
import {LogonService} from "../logon.service";
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  senha: string;
  erro = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  entrar() {
    this.authService.auth(this.login, this.senha)
      .subscribe(pessoas => {
        if (pessoas.length > 0) {
          this.erro = null;
          this.authService.set(pessoas[0]);
          this.router.navigate(['admin']);
        } else {
          this.erro = 'Login ou senha incorretos';
        }
      });
  }
}
