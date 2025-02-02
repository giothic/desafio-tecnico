import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importando o RouterModule

@Component({
  selector: 'app-root',
  template: `
    <h1>Bem-vindo à aplicação!</h1>
    <nav>
      <a routerLink="/listar-cidades">Listar Cidades</a>
      <a routerLink="/listar-comercios">Listar Comercios</a>
    </nav>
    <router-outlet></router-outlet> <!-- Exibe os componentes de acordo com a rota -->
  `,
  standalone: true, // Indica que este componente é independente
  imports: [RouterModule] // Adicionando o RouterModule aqui
})
export class AppComponent {}
