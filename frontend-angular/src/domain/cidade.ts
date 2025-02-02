
//---------------------------------------------------
/** Classe que guarda os dados de uma cidade */
//---------------------------------------------------

export class Cidade {
  id?: number; 
  nome: string = ''; 
  uf: string = '';
  capital: boolean = false;


  constructor(nome?: string, uf?: string, capital?: boolean) {
      this.nome = nome || '';
      this.uf = uf || '';
      this.capital = capital || false;
  }
}

