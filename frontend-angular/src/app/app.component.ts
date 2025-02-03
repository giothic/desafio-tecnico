import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  template: `
    <h1>Bem-vindo à aplicação!</h1>
    <nav>
      <a routerLink="/listar-cidades">Listar Cidades</a>
      <a routerLink="/listar-comercios">Listar Comercios</a>
    </nav>
    <router-outlet></router-outlet> 
  `,
  standalone: true, 
  imports: [RouterModule],
  styles: [`
    h1 {
      color: #333;
      text-align: center;
    }
    nav {
      background-color: #f9fafb;
      padding: 10px;
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    nav a {
      color: #3b82f6;
      text-decoration: none;
      font-size: 16px;
    }
    nav a:hover {
      color:rgb(39, 102, 203);
    }
  `]
})
export class AppComponent {}
