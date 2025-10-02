export default class Aeronave {
    public codigo: string
    public modelo: string
    public tipo: TipoAeronave
    public capacidade: number
    public alcance: number

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number){
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
    }

    //get 

    get getCodigo(): string { return this.codigo}

    get getModelo(): string { return this.modelo}

    get getTipo(): string { return this.tipo }

    get getCapacidade(): number { return this.capacidade}

    get getAlcance(): number { return this.alcance  }

    public detalhes = (): void => {
        console.log(
            `codigo: ${this.codigo}
            modelo: ${this.modelo}
            tipo: ${this.tipo}
            capacidade: ${this.capacidade}
            alcance: ${this.alcance}`
        )
    }

}

export enum TipoAeronave {
    COMERCIAL = 'COMERCIAL',
    MILITAR = 'MILITAR'
}