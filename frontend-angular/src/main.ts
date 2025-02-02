import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule, Routes } from '@angular/router'; 
import { ListarCidades } from './app/cidade/listar-cidades';
import { AppComponent } from './app/app.component';
import { ListarComercios } from './app/cidade/listar-comercios';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


const routes: Routes = [
    { path: 'listar-cidades', component: ListarCidades },
    { path: 'listar-comercios', component: ListarComercios },
    { path: '', redirectTo: 'listar-cidades', pathMatch: 'full' }, 
  ];
  0

  

  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes), 
      provideAnimationsAsync(), 
    ],
  }).catch((err) => console.error(err));
