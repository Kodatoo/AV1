import { stat } from "fs"
import Funcionario from "./funcionario"

export default class Etapa{
    public nome: string
    public prazo: string
    public status: StatusEtapa
    public funcionarios: Funcionario[]

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Funcionario[]){
        this.nome = nome
        this.prazo = prazo
        this.status = status
        this.funcionarios = funcionarios
    }

    // get

    get getNome(): string { return this.nome }

    get getPrazo(): string { return this.prazo }

    get getStatus(): StatusEtapa { return this.status }

    get getFuncionarios(): Funcionario[] { return this.funcionarios }
}


export enum StatusEtapa{
    PENDENTE = "PENDENTE",
    ANDAMENTO = "ANDAMENTO",
    CONCLUIDA = "CONCLUIDA"
}

