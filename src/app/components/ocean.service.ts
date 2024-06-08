import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Regiao } from './interfaces/oceano';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OceanService {

  oceanos: Regiao[] = []
  private url = "https://fiap-3sis-gs-20241.azurewebsites.net/OceanData";

  constructor(private http: HttpClient) {}

  listar(): Observable<Regiao[]>{
    return this.http.get<Regiao[]>(this.url) as Observable<Regiao[]>;
  }

}
