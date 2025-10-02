export default class Tipo{
    public nome: string
    public tipo: TipoPeca
    public fornecedor: string
    public status: StatusPeca
    
    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca){
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }

    get getNome(): string { return this.nome  }

    get getTipo(): string { return this.tipo }

    get getFornecedor(): string { return this.fornecedor }

    get getStatus(): string { return this.status }

}


export enum StatusPeca{
    EM_PRODUCAO = 'EM_PRODUCAO',
    EM_TRANSPORTE = 'EM_TRANSPORTE',
    PRONTA = 'PRONTA'
}

export enum TipoPeca{
    NACIONAL = 'NACIONAL',
    IMPORTADA = 'IMPORTADA'
}