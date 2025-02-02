import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '@domain/cidade';
import { environment } from '../app/environments/environment';

@Injectable({
    providedIn: 'root' 
})
export class ProjetoService {


    private apiUrl = `${environment.apiUrl}/cidades`;

    //------------------------------------------------
    /** Construtor. */
    //------------------------------------------------
    constructor(private http: HttpClient) {}

    //------------------------------------------------
    /** Recupera a lista de cidades */
    //------------------------------------------------
    pesquisarCidades(): Observable<Cidade[]> {
        return this.http.get<Cidade[]>(this.apiUrl);
    }

    //------------------------------------------------
    /** Exclui a cidade informada */
    //------------------------------------------------
    excluir(cidade: Cidade): Observable<any> {
        const url = `${this.apiUrl}/${cidade.id}`; 
        return this.http.delete(url);
    }

    //------------------------------------------------
    /** Salva a cidade informada */
    //------------------------------------------------

    salvar(cidade: Cidade): Observable<Cidade> {
        return this.http.post<Cidade>(this.apiUrl, cidade);
    }


    atualizarCidade(cidade: Cidade): Observable<any> {
        const url = `${this.apiUrl}/${cidade.id}`;
        return this.http.put(url, cidade);
    }
    }

