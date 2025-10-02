export default class Teste{
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    constructor(tipo: TipoTeste, resultado: ResultadoTeste){
        this.tipo = tipo
        this.resultado = resultado
    }

    get getTipo(): TipoTeste { return this.tipo }

    get getResultado(): ResultadoTeste { return this.resultado }
}

export enum TipoTeste{
    ELETRICO = "ELETRICO",
    HIDRAULICO = "HIDRAULICO",
    AERODINAMICO = "AERODINAMICO"
}

export enum ResultadoTeste{
    APROVADO = "APROVADO",
    REPROVADO = "REPROVADO"
}