import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario";
import {Exception} from "../../models/exception";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit {
  file: File | null = null;
  usuarios: Usuario[] = [];

  mostrarMensagemDeSucesso = false;
  mostrarMensagemDeErro = false;

  exception: Exception | undefined;
  mensagemDeSucesso: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getAll().subscribe(data => {
      this.usuarios = data;
    });
  }

  deletarUsuario(id: string) {
    this.usuarioService.delete(id).subscribe(data => {
      this.mostrarMensagemDeSucesso = true;
      this.mensagemDeSucesso = "Usuário deletado com sucesso!";
      this.getUsuarios();
    }, error => {
      console.log(error);
      this.mostrarMensagemDeErro = true
      this.exception = error.error;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.file = input.files[0];
    }
  }

  onSubmit() {
    if (!this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post('http://localhost:3000/usuarios/upload', formData).subscribe(
      (response) => {
        console.log('Arquivo enviado com sucesso', response);
        alert("Usuários criados");
        this.getUsuarios();
      },
      (error) => {
        alert('Erro ao enviar arquivo');
      }
    );
  }
}
