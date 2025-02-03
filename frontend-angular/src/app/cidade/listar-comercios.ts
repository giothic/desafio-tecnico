import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../imports';
import { Comercio } from '@domain/comercio';
import { ProjetoService } from '@service/projeto-service';
import { MessageService } from 'primeng/api';
import { ComercioService } from '@service/comercio-service';
import { CadastrarComercio } from './cadastrar-comercio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//-------------------------------------------------------------------------------------
// Tela para listar comércios
//-------------------------------------------------------------------------------------
@Component({
    selector: 'listar-comercios',
    templateUrl: 'listar-comercios.html',
    standalone: true,
    imports: [ImportsModule, CadastrarComercio,],
    providers: [ComercioService, MessageService]
})
export class ListarComercios implements OnInit {
    //-------------------------------------------------------
    // Lista de comércios, exibida na tabela
    //-------------------------------------------------------
    listaComercios: Comercio[] = [];

    //-------------------------------------------------------------
    // Atributo que guarda o comércio que foi selecionado na tabela
    //-------------------------------------------------------------
    comercioSelecionado: Comercio = new Comercio();

    //-------------------------------------------------------------
    // Flag usada para mostrar/esconder a janela de cadastro
    //-------------------------------------------------------------
    mostraJanelaComercio: boolean = false;
    comercio: Comercio[];


    //--------------------------------------------------------------
    /** Construtor. Recebe os services usados pelo componente */
    //--------------------------------------------------------------
    constructor(private service:    ComercioService, private messageService: MessageService,     private serviceCidade: ProjetoService) {}

    //-------------------------------------------------------------------------------------
    /** Inicializacao do componente. Recupera a lista de comércios para exibir na tabela */
    //-------------------------------------------------------------------------------------
    listaDeCidades: { id: number; nome: string }[] = [];

    ngOnInit() {
        this.pesquisarComercios();

        this.service.pesquisarComercios().subscribe((dados) => {
          console.log(dados); // Verifique se os dados estão corretos
          this.comercio = dados;
        });
      }
      
    

    private pesquisarComercios(): void {
        this.service.pesquisarComercios().subscribe({
            next: (comercios) => {
                console.log('Comércios carregados:', comercios);
                this.listaComercios = comercios;
            },
            error: (error) => {
                console.error('Erro ao carregar comércios:', error);
            }
        });
    }

    //-------------------------------------------------------------------------------------
    // Método chamado ao clicar no botão 'Alterar'
    //-------------------------------------------------------------------------------------
    public abreJanelaParaAlterarComercio(comercio: Comercio): void {
        console.log('Antes de abrir:', this.mostraJanelaComercio);
        this.comercioSelecionado = { ...comercio };
        this.mostraJanelaComercio = true;
        console.log('Depois de abrir:', this.mostraJanelaComercio);
    }

    //-------------------------------------------------------------------------------------
    // Método chamado ao clicar no botão 'Excluir'
    //-------------------------------------------------------------------------------------
    public excluirComercio(comercio: Comercio): void {

    
        console.log('Botão "Excluir" clicado para o comércio:', comercio);
    

    
        this.service.excluirComercio(comercio).subscribe({
            next: () => {
                console.log('Comércio excluído com sucesso:', comercio);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Info',
                    detail: `Comércio '${comercio.nome}' excluído com sucesso!`
                });
    

                this.pesquisarComercios();
            },
            error: (error: any) => {
                console.error('Erro ao excluir comércio:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: `Não foi possível excluir o comércio '${comercio.nome}'. Erro: ${error.message || 'Desconhecido'}`
                });
            }
        });
    }
    
    

    //-------------------------------------------------------------------------------------
    // Método chamado quando a janela de cadastro é fechada
    //-------------------------------------------------------------------------------------
    public fechaJanelaComercio(salvou: boolean): void {
        console.log('Janela de cadastro fechada. Salvou?', salvou);

        this.mostraJanelaComercio = false;

        if (salvou) {
            this.pesquisarComercios();
        }
    }

}
