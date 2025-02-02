import { Component, OnInit } from '@angular/core';
import { ImportsModule } from '../imports';
import { Comercio } from '@domain/comercio';
import { ProjetoService } from '@service/projeto-service';
import { MessageService } from 'primeng/api';
import { ComercioService } from '@service/comercio-service';

//-------------------------------------------------------------------------------------
// Tela para listar comércios
//-------------------------------------------------------------------------------------
@Component({
    selector: 'listar-comercios',
    templateUrl: 'listar-comercios.html',
    standalone: true,
    imports: [ImportsModule],
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
    mostraListaDeComercios: boolean = true;
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
      
    
    
    private carregarCidades(): void {
        this.serviceCidade.pesquisarCidades().subscribe({
            next: (cidades) => {
                this.listaDeCidades = cidades
                    .filter((cidade) => cidade.id !== undefined) 
                    .map((cidade) => ({
                        id: cidade.id as number, 
                        nome: cidade.nome
                    }));
    
                console.log("Cidades carregadas:", this.listaDeCidades);
            },
            error: (error) => {
                console.error('Erro ao carregar cidades:', error);
            }
        });
    }
    
    
    private getNomeCidade(cidadeId: number): string {
        const cidade = this.listaDeCidades.find(c => c.id === cidadeId);
        return cidade ? cidade.nome : 'Desconhecido';
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
        console.log('Botão "Alterar" clicado para o comércio:', comercio);

        this.comercioSelecionado = { ...comercio };
        this.mostraJanelaComercio = true;
    }

    //-------------------------------------------------------------------------------------
    // Método chamado ao clicar no botão 'Excluir'
    //-------------------------------------------------------------------------------------
    public excluirComercio(comercio: Comercio): void {

    
        console.log('Botão "Excluir" clicado para o comércio:', comercio);
    

    
        this.service.excluirComercio(comercio.id).subscribe({
            next: () => {
                console.log('Comércio excluído com sucesso:', comercio);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Info',
                    detail: `Comércio '${comercio.nome}' excluído com sucesso!`
                });
    
                // Atualiza a lista de comércios após a exclusão
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
