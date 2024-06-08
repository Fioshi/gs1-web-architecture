import { Component } from '@angular/core';
import { OceanService } from '../ocean.service';
import { Regiao } from '../interfaces/oceano';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-oceans',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule
  ],
  templateUrl: './oceans.component.html',
  styleUrl: './oceans.component.css'
})
export class OceansComponent {

  oceanos: Regiao[] = [];
  regioes: Regiao[] = [];
  filtroForm: FormGroup = new FormGroup({});

  constructor(private service: OceanService, private formBuild: FormBuilder)
  {
    this.filtroForm = this.formBuild.group({

    })
   }

  ngOnInit():void{
    this.listar();
    this.listarRegiaoSemRepeticao();
  }

  listarRegiaoSemRepeticao(){
    this.oceanos.forEach((regiao)=> {
      if(!this.regioes.includes(regiao)){
        this.regioes.push(regiao);
      }
    })
  }

  listar() {
    this.service.listar().subscribe((item) => { 
      this.oceanos = item;
    });
  }

}
