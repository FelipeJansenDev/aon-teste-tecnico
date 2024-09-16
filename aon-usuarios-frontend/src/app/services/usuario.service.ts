import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario";

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) {}

  create(usuario: any) {
    return this.http.post<any>(`${environment.apiUrl}/usuarios`, usuario);
  }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.apiUrl}/usuarios`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/usuarios/${id}`);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/${id}`);
  }

}
