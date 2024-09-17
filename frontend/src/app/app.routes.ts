import {provideRouter, Routes} from '@angular/router';
import {CadastroUsuarioComponent} from "./pages/cadastro-usuario/cadastro-usuario.component";
import {ListaUsuariosComponent} from "./pages/lista-usuarios/lista-usuarios.component";
import {provideHttpClient} from "@angular/common/http";
import {ApplicationConfig} from "@angular/core";

export const routes: Routes = [
  { path: '', component: ListaUsuariosComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro-usuario/:id', component: CadastroUsuarioComponent },
];

