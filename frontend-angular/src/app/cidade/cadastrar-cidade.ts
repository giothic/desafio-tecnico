import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cidade } from '@domain/cidade';
import { ProjetoService } from '@service/projeto-service';
import { MessageService } from 'primeng/api';
import { ImportsModule } from '../imports';

@Component({
    selector: 'cadastrar-cidade',
    templateUrl: 'cadastrar-cidade.html',
    standalone: true,
    imports: [ImportsModule],
    providers: [ProjetoService],
    styleUrls: ['./styles/cidade-form.css']
})
export class CadastrarCidade {

    //-------------------------------------------------------
    // Parâmetro de entrada para o componente
    //-------------------------------------------------------
    @Input() set cidade(value: Cidade) {
        if (value) {
            this._cidade = { ...value }; 
        } else {
            this._cidade = new Cidade(); 
        }
    }
    get cidade(): Cidade {
        return this._cidade;
    }
    private _cidade: Cidade = new Cidade();

    //-------------------------------------------------------
    // Evento lançado ao fechar a janela
    //-------------------------------------------------------
    @Output('onClose') private eventoFechaJanela = new EventEmitter<boolean>();

    //--------------------------------------------------------------
    /** Construtor. */
    //--------------------------------------------------------------
    constructor(private service: ProjetoService, private messageService: MessageService) {}

    //-------------------------------------------------------------------------------------
    /** Método chamado ao clicar no botão 'salvar' */
    //-------------------------------------------------------------------------------------
    public salvar(): void {
        console.log('Método salvar chamado! Cidade:', this.cidade);

        if (this.cidade.id) {
            console.log('Atualizando cidade...', this.cidade);

            this.service.atualizarCidade(this.cidade).subscribe({
                next: (result): void => {
                    console.log('Resposta da API (PUT):', result);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Info',
                        detail: `Cidade '${this.cidade.nome}' atualizada com sucesso!`
                    });
                },
                error: (error): void => {
                    console.error('Erro na requisição (PUT):', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: `Cidade '${this.cidade.nome}' não foi atualizada!`
                    });
                },
                complete: (): void => {
                    console.log('Requisição PUT finalizada. Fechando janela...');
                    this.eventoFechaJanela.emit(true);
                }
            });

        } else {
            console.log('Criando nova cidade...', this.cidade);

            this.service.salvar(this.cidade).subscribe({
                next: (result): void => {
                    console.log('✅ Resposta da API (POST):', result);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Info',
                        detail: `Cidade '${this.cidade.nome}' cadastrada com sucesso!`
                    });
                },
                error: (error): void => {
                    console.error('Erro na requisição (POST):', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erro',
                        detail: `Cidade '${this.cidade.nome}' não foi salva!`
                    });
                },
                complete: (): void => {
                    console.log('Requisição POST finalizada. Fechando janela...');
                    this.eventoFechaJanela.emit(true); 
                }
            });
        }
    }

    //-------------------------------------------------------------------------------------
    /** Método chamado ao clicar no botão 'cancelar' */
    //-------------------------------------------------------------------------------------
    public cancelar(): void {
        console.log('Cancelando cadastro. Fechando janela...');
        this.eventoFechaJanela.emit(false);
}

}