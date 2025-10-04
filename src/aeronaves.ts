import * as fs from 'fs';
import * as path from 'path';

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
    public salvar = (): void => {
        const aeronaveData = {
            codigo: this.getCodigo,
            mdoelo: this.getModelo,
            tipo: this.getTipo,
            capacidade: this.getCapacidade,
            alcance: this.getAlcance
        }

        const publicDirPath = path.join(__dirname, '..', 'public')
        const filePath = path.join(__dirname, '..', 'public', 'aeronaves.json')

        if (!fs.existsSync(publicDirPath)) {
            fs.mkdirSync(publicDirPath, { recursive: true })
        }

        try {
            let aeronaves = []

            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf-8')
                aeronaves = JSON.parse(data) // converte json em array de objetos
            }

            aeronaves.push(aeronaveData)

            fs.writeFileSync(filePath, JSON.stringify(aeronaves, null, 2), 'utf-8')
            console.log("Aeronave salva com sucesso.")
        }
        catch (err) {
            console.log(`Erro ao salvar a aeronave: ${err}`);
        }

    

}}

export enum TipoAeronave {
    COMERCIAL = 'COMERCIAL',
    MILITAR = 'MILITAR'
}