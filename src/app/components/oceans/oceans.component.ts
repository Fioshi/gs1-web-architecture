import { Component } from '@angular/core';
import { OceanService } from '../ocean.service';
import { Especie, Regiao } from '../interfaces/oceano';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ignoreElements } from 'rxjs';

@Component({
  selector: 'app-oceans',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './oceans.component.html',
  styleUrls: ['./oceans.component.css']
})
export class OceansComponent {
  oceanos: Regiao[] = [];
  oceanosBackup: Regiao[] = [];
  oceanosFiltrado: Regiao[] = [];

  niveisPoluicao: string[] = [];
  statusEspecies: string[] = [];
  especiesFiltradas: string[] = [];
  regioes: string[] = [];

  filtroForm: FormGroup;

  constructor(private service: OceanService, private formBuilder: FormBuilder) {
    this.filtroForm = this.formBuilder.group({
      regiao: [''],
      especie: [''],
      status: [''],
      tempAgua: [''],
      ph: [''],
      poluicao: ['']
    });
  }

  filtrar(): void {
    const regiao = this.filtroForm.value.regiao;
    const especie = this.filtroForm.value.especie;
    const status = this.filtroForm.value.status;
    const tempAgua = this.filtroForm.value.tempAgua;
    const ph = this.filtroForm.value.ph;
    const poluicao = this.filtroForm.value.poluicao;

    if (this.oceanos.length !== this.oceanosBackup.length) {
      this.oceanos = this.oceanosBackup;
    }

    this.oceanosFiltrado = this.oceanos.filter(oceano => {
      const matchRegiao = !regiao || oceano.regiao === regiao;
      const matchEspecie = !especie || oceano.especies.some(e => e.nome === especie);
      const matchStatus = !status || oceano.especies.some(e => e.status === status);
      const matchTempAgua = !tempAgua || oceano.temperaturaAgua <= tempAgua && oceano.temperaturaAgua > tempAgua - 5;
      const matchPh = !ph || oceano.pH <= ph && oceano.pH > ph - 0.3;
      const matchPoluicao = !poluicao || oceano.nivelPoluicao == poluicao
      return matchRegiao && matchEspecie && matchStatus && matchTempAgua && matchPh && matchPoluicao;
    });

    this.oceanosFiltrado.forEach(oce => console.log(oce.regiao));
    this.oceanos = this.oceanosFiltrado;
  }

  ngOnInit(): void {
    this.listar();
  }

  listarOpcoes(): void {
    this.oceanos.forEach((regiao) => {
      regiao.especies.forEach(especie => {
        if (!this.especiesFiltradas.includes(especie.nome)) {
          this.especiesFiltradas.push(especie.nome)
        }
        if (!this.statusEspecies.includes(especie.status)){
          this.statusEspecies.push(especie.status)
        }
        if (!this.niveisPoluicao.includes(regiao.nivelPoluicao)) {
          this.niveisPoluicao.push(regiao.nivelPoluicao);
        }
        if (!this.regioes.includes(regiao.regiao)) {
          this.regioes.push(regiao.regiao);
        }
      })
    })
  }

  listar() {
    this.service.listar().subscribe((item) => {
      this.oceanosBackup = item;
      this.oceanos = this.oceanosBackup
      this.listarOpcoes();
    });
  }

  modalContent: string = ''
  openModal(): void {
    this.modalContent = 'Informações que você deseja exibir';
  }
}
