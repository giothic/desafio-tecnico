import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../imports';
import { Cidade } from '@domain/cidade';
import { ProjetoService } from '@service/projeto-service';
import { CadastrarCidade } from './cadastrar-cidade';
import { CadastrarComercio } from './cadastrar-comercio';
import { MessageService } from 'primeng/api';
import { Comercio } from '@domain/comercio';

//-------------------------------------------------------------------------------------
/** Tela para listar cidades */
//-------------------------------------------------------------------------------------
@Component({
    selector: 'listar-cidades',
    templateUrl: 'listar-cidades.html',
    standalone: true,
    imports: [ImportsModule, CadastrarCidade, CadastrarComercio],
    providers: [ProjetoService, MessageService]
})
export class ListarCidades implements OnInit {
    //-------------------------------------------------------
    // Lista de cidades, exibida na tabela
    //-------------------------------------------------------
    listaCidades: Cidade[] = [];

    //-------------------------------------------------------------
    // Atributo que guarda a cidade que foi selecionada na tabela
    //-------------------------------------------------------------
    cidadeSelecionada: Cidade = new Cidade();
    comercioSelecionado: Comercio = new Comercio();

    //-------------------------------------------------------------
    // Flag usada para mostrar/esconder a janela de cadastro
    //-------------------------------------------------------------
    mostraJanelaCadastro: boolean = false;
    mostraJanelaComercio: boolean = false;

    //--------------------------------------------------------------
    /** Construtor. Recebe os services usados pelo componente */
    //--------------------------------------------------------------
    constructor(private service: ProjetoService, private messageService: MessageService) {}

    //-------------------------------------------------------------------------------------
    /** Inicializacao do componente. Recupera a lista de cidades para exibir na tabela */
    //-------------------------------------------------------------------------------------
    ngOnInit() {
        this.pesquisarCidades();
    }

    private pesquisarCidades(): void {
        this.service.pesquisarCidades().subscribe({
            next: (cidades) => {
                console.log('Cidades carregadas:', cidades);
                this.listaCidades = cidades;
            },
            error: (error) => {
                console.error('Erro ao carregar cidades:', error);
            }
        });
    }

//-------------------------------------------------------------------------------------
// Método chamado ao clicar no botão 'Nova Cidade'
//-------------------------------------------------------------------------------------
public abreJanelaParaCadastrarNovaCidade(): void {
    console.log('Botão "Nova Cidade" clicado');
    
    this.cidadeSelecionada = new Cidade();
    this.mostraJanelaCadastro = true;
}

public abreListaComercios(): void {
    console.log('Botão "Nova Cidade" clicado');
    
    this.cidadeSelecionada = new Cidade();
    this.mostraJanelaComercio = true;
}

//-------------------------------------------------------------------------------------
// Método chamado ao clicar no botão 'Alterar'
//-------------------------------------------------------------------------------------
public abreJanelaParaAlterarCidade(cidade: Cidade): void {
    console.log('Botão "Alterar" clicado para a cidade:', cidade);

    this.cidadeSelecionada = { ...cidade };
    this.mostraJanelaCadastro = true;
}


public abreFormularioComercio(): void {
    console.log('Botão "Novo comercio" clicado');
    console.log('mostraJanelaComercio antes:', this.mostraJanelaComercio);

    this.comercioSelecionado = new Comercio();
    this.mostraJanelaComercio = true;

    console.log('mostraJanelaComercio depois:', this.mostraJanelaComercio);
}

//-------------------------------------------------------------------------------------
// Método chamado ao clicar no botão 'Excluir'
//-------------------------------------------------------------------------------------
public excluir(cidade: Cidade): void {
    console.log('Botão "Excluir" clicado para a cidade:', cidade);

    this.service.excluir(cidade).subscribe({
        next: () => {
            console.log('Cidade excluída com sucesso:', cidade);
            this.messageService.add({
                severity: 'success',
                summary: 'Info',
                detail: `Cidade '${cidade.nome}' excluída com sucesso!`
            });
            this.pesquisarCidades();
        },
        error: (error) => {
            console.error('Erro ao excluir cidade:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: `Não foi possível excluir a cidade '${cidade.nome}'.`
            });
        }
    });
}

//-------------------------------------------------------------------------------------
// Método chamado quando a janela de cadastro é fechada
//-------------------------------------------------------------------------------------
public fechaJanelaCadastro(salvou: boolean): void {
    console.log('Janela de cadastro fechada. Salvou?', salvou);

    this.mostraJanelaCadastro = false;

    if (salvou) {
        this.pesquisarCidades();
    }
}
}