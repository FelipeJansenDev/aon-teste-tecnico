import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario";

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent implements OnInit{

  formUsuario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formUsuario = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      idade: ['', Validators.required]
    });
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] != null) {
        this.findById(params['id']);
      }
    });
  }

  private findById(id: string) {
    console.log(id);
    this.usuarioService.getById(id).subscribe(usuario => {
      this.formUsuario.patchValue({
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        idade: usuario.idade,
      });
    });
  }

  onSubmit() {
    console.log(this.formUsuario.getRawValue());
    if (!this.formUsuario.get('id')?.value) {
      this.cadastrarUsuario();
    } else {
      this.atualizarUsuario();
    }
  }

  private cadastrarUsuario() {
    this.usuarioService.create(this.formUsuario.value).subscribe(data => {
      this.router.navigateByUrl("/");
      alert("Usuário criado com sucesso!");
    })
  }

  private atualizarUsuario() {
    this.usuarioService.update(this.formUsuario.value).subscribe(data => {
      this.router.navigateByUrl("/");
      alert("Usuário atualizado com sucesso!");
    })
  }
}
