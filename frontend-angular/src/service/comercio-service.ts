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
    /** Construtor. */
    //------------------------------------------------
    constructor(private http: HttpClient) {}

    //------------------------------------------------
    /** Recupera a lista de cidades */
    //------------------------------------------------
    pesquisarComercios(): Observable<Comercio[]> {
        return this.http.get<Comercio[]>(this.apiUrl);
    }

    //------------------------------------------------
    /** Exclui a cidade informada */
    //------------------------------------------------
    excluir(comercio: Comercio): Observable<any> {
        const url = `${this.apiUrl}/${comercio.id}`; 
        return this.http.delete(url);
    }

    //------------------------------------------------
    /** Salva a cidade informada */
    //------------------------------------------------

    salvar(comercio: Comercio): Observable<Comercio> {
        return this.http.post<Comercio>(this.apiUrl, comercio);
    }


    atualizarComercio(comercio: Comercio): Observable<any> {
        const url = `${this.apiUrl}/${comercio.id}`;
        return this.http.put(url, comercio);
    }
    
    }

