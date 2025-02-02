

export class Comercio {
    id?: number;
    nome: string = '';
    responsavel: string = '';
    tipo: TipoComercio;
    cidadeId: number;
  
    constructor(nome?: string, responsavel?: string, tipo?: TipoComercio, cidadeId?: number) {
      this.nome = nome || '';
      this.responsavel = responsavel || '';
      this.tipo = tipo!;
      this.cidadeId = cidadeId!;
    }
  }
  
  export enum TipoComercio {
    FARMACIA = 'FARMACIA',
    PADARIA = 'PADARIA',
    POSTO_GASOLINA = 'POSTO_GASOLINA',
    LANCHONETE = 'LANCHONETE'
    
  }
  

