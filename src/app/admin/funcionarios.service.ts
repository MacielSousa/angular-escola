import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class FuncionariosService{
    API_URL = 'http://localhost:3000';

    constructor(private http: HttpClient){}

    getPessoas(): Observable<any[]> {
        return this.http.get<any[]>(this.API_URL + '/pessoas');
    }

    getCargos(): Observable<any[]> {
        return this.http.get<any[]>(this.API_URL + '/cargos');
    }

    getFuncoes(): Observable<any[]> {
        return this.http.get<any[]>(this.API_URL + '/funcoes');
    }

    addDocente(pessoaId: number, cargoId: number): Observable<any> {
        const docente = {pessoaId: pessoaId, cargoId: cargoId};
        return this.http.post(this.API_URL + '/docentes', docente);
    }

    addAdministrativo(pessoaId: number, cargoId: number): Observable<any> {
        const administrativo = {pessoaId: pessoaId, cargoId: cargoId};
        return this.http.post(this.API_URL + '/administrativos', administrativo);
    }

    addFuncionarioCargoFuncoes(pessoaId: number, cargoId: number, funcaoId: number ): Observable<any> {
        const funcionarioCargoFuncao = {pessoaId: pessoaId, cargoId: cargoId, funcaoId: funcaoId};
        return this.http.post(this.API_URL + '/funcionarioCargoFuncoes', funcionarioCargoFuncao);
    }
}
