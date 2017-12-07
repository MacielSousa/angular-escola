import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class PessoasService{
    API_URL = 'http://localhost:3000';

    constructor(private http: HttpClient){}

    getPessoas(): Observable<any[]> {
        return this.http.get<any[]>(this.API_URL + '/pessoas');
    }

    getPessoa(id: number): Observable<any> {
        return this.http.get(this.API_URL + '/pessoas/'+ id + '?_embed=usuarios');
    }

    addPessoa(id: string, nome: string, dtNascimento: string): Observable<any> {
        const pessoa = {id: id, nome: nome, dtNascimento: dtNascimento};
        return this.http.post(this.API_URL + '/pessoas', pessoa);
    }

    updatePessoa(id: string, nome: string, dtNascimento: string){
        const pessoa = {id: id, nome: nome, dtNascimento: dtNascimento};
        return this.http.patch(this.API_URL + '/pessoas/' + id, pessoa);
    }

    deletePessoa(id: string){
        return this.http.delete(this.API_URL + '/pessoas/' + id)
    }
}