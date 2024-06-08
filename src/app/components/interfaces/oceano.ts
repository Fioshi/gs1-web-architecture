interface Especie {
    nome: string;
    status: string;
  }
  
  interface ProjetoConservacao {
    nomeProjeto: string;
    tipoProjeto: string;
    tipoParticipacao: string;
  }
  
  export interface Regiao {
    regiao: string;
    temperaturaAgua: number;
    pH: number;
    nivelPoluicao: string;
    especies: Especie[];
    projetosConservacao: ProjetoConservacao[];
  }
  