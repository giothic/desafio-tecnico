import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comercio } from '@domain/comercio'; // Importe o seu modelo de Comercio
import { ProjetoService } from '@service/projeto-service';
import { MessageService } from 'primeng/api';
import { ImportsModule } from '../imports';
import { ComercioService } from '@service/comercio-service';
import { Cidade } from '@domain/cidade';

export enum TipoComercio {
  FARMACIA = 'FARMACIA',
  PADARIA = 'PADARIA',
  POSTO_GASOLINA = 'POSTO_GASOLINA',
  LANCHONETE = 'LANCHONETE'
}

@Component({
    selector: 'cadastrar-comercio',
    templateUrl: 'cadastrar-comercio.html',
    standalone: true,
    imports: [ImportsModule],
    providers: [ComercioService]
})
export class CadastrarComercio {

    cidadeSelecionada: Cidade = new Cidade();

    //-------------------------------------------------------
    // Parâmetro de entrada para o componente
    //-------------------------------------------------------

    @Input() set comercio(value: Comercio) {
        if (value) {
            this._comercio = { ...value };  // Copia os dados de comercio
        } else {
            this._comercio = new Comercio();  // Caso o valor seja null ou undefined, inicializa um novo objeto Comercio
        }
    }
    
    get comercio(): Comercio {
        return this._comercio;  // Retorna o objeto comercio atual
    }
    
    private _comercio: Comercio = new Comercio();
    

    //-------------------------------------------------------
    // Evento lançado ao fechar a janela
    //-------------------------------------------------------
    @Output('onClose') private eventoFechaJanela = new EventEmitter<boolean>();

    //--------------------------------------------------------------
    /** Construtor. */
    //--------------------------------------------------------------
    constructor(private service: ComercioService, private messageService: MessageService) {}

    //--------------------------------------------------------------
    /** Método chamado ao clicar no botão 'salvar' */
    //--------------------------------------------------------------
    public salvarComercio(cidade: Cidade): void {
        console.log('Método salvar chamado! Comércio:', this.comercio);
    
    
        // Atribui o cidadeId ao objeto comercio, caso ainda não tenha sido atribuído
        if (!this.comercio.cidadeId) {
            this.comercio.cidadeId = cidade.id;
        }
    
        // Se o id não estiver presente, isso indica que é um novo comércio
        if (!this.comercio.id) {
            console.log('Criando novo comércio...', this.comercio);
        } else {
            console.log('Atualizando comércio...', this.comercio);
        }
    
        // Formata o objeto comercio para enviar ao back-end
        const comercioFormatado = {
            ...this.comercio,
            cidadeId: this.comercio.cidadeId // Garantindo que o cidadeId está presente
        };
    
        console.log("Comércio formatado:", comercioFormatado);
    
        // Se o id estiver presente, chama o método de atualização, caso contrário, cria um novo comércio
        if (this.comercio.id) {
            this.service.atualizarComercio(comercioFormatado).subscribe({
                next: (result): void => {
                    console.log('Resposta da API (PUT):', result);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Info',
                        detail: `Comércio '${this.comercio.nome}' atualizado com sucesso!`
                    });
                },
                error: (error): void => {
                    console.error('Erro na requisição (PUT):', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: `Comércio '${this.comercio.nome}' não foi atualizado!`
                    });
                },
                complete: (): void => {
                    console.log('Requisição PUT finalizada. Fechando janela...');
                    this.eventoFechaJanela.emit(true);
                }
            });
        } else {
            this.service.salvarComercio(comercioFormatado).subscribe({
                next: (result): void => {
                    console.log('✅ Resposta da API (POST):', result);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Info',
                        detail: `Comércio '${this.comercio.nome}' cadastrado com sucesso!`
                    });
                },
                error: (error): void => {
                    console.error('Erro na requisição (POST):', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: `Comércio '${this.comercio.nome}' não foi salvo!`
                    });
                },
                complete: (): void => {
                    console.log('Requisição POST finalizada. Fechando janela...');
                    this.eventoFechaJanela.emit(true);
                }
            });
        }
    }
    

    //--------------------------------------------------------------
    /** Método chamado ao clicar no botão 'cancelar' */
    //--------------------------------------------------------------
    public cancelar(): void {
        console.log('🔙 Cancelando cadastro. Fechando janela...');
        this.eventoFechaJanela.emit(false); // Fecha a janela sem salvar
    }

    //--------------------------------------------------------------
    // Valores do enum para o tipo de comércio
    //--------------------------------------------------------------
    tipoComercioEnum = Object.values(TipoComercio);
}