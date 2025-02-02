import { bootstrapApplication } from '@angular/platform-browser';
    import { ListarCidades } from './app/cidade/listar-cidades';
    import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

    bootstrapApplication(ListarCidades, {
    providers: [provideAnimationsAsync()],
    }).catch((err) => console.error(err));