import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../app/environments/environment';
import { Comercio } from '@domain/comercio';

@Injectable({
    providedIn: 'root' 
})
export class ComercioService {

    private apiUrl = `${environment.apiUrl}/comercios`;

    //------------------------------------------------
    /** Construtor */
    //------------------------------------------------
    constructor(private http: HttpClient) {}

    //------------------------------------------------
    /** Recupera a lista de comércios */
    //------------------------------------------------
    pesquisarComercios(): Observable<Comercio[]> {
        return this.http.get<Comercio[]>(this.apiUrl);
    }

    //------------------------------------------------
    /** Recupera um comércio pelo ID */
    //------------------------------------------------
    pesquisarComercio(id: number): Observable<Comercio> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Comercio>(url);
    }

    //------------------------------------------------
    /** Exclui um comércio */
    //------------------------------------------------
    excluirComercio(comercio : Comercio): Observable<any> {
        const url = `${this.apiUrl}/${comercio.id}`;
        console.log('URL da requisição DELETE:', url);
        return this.http.delete<void>(url);
    }

    //------------------------------------------------
    /** Salva um novo comércio */
    //------------------------------------------------
    salvarComercio(comercio: Comercio): Observable<Comercio> {
        console.log('Enviando para o back-end:', JSON.stringify(comercio));
        return this.http.post<Comercio>(this.apiUrl, comercio);
    }

    //------------------------------------------------
    /** Atualiza um comércio existente */
    //------------------------------------------------
    atualizarComercio(comercio: Comercio): Observable<any> {
        const url = `${this.apiUrl}/${comercio.id}`;
        return this.http.put(url, comercio);
    }
}
