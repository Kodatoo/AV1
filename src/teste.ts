import * as path from 'path';
import * as fs from 'fs';

export default class Teste{
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    constructor(tipo: TipoTeste, resultado: ResultadoTeste){
        this.tipo = tipo
        this.resultado = resultado
    }

    get getTipo(): TipoTeste { return this.tipo }

    get getResultado(): ResultadoTeste { return this.resultado }

    public salvar = (): void =>{
        const testesdata = {
        tipo: this.getTipo,
        resultado: this.getResultado
        }

    const publicDirPath = path.join(__dirname, '..', 'public')
    const filePath = path.join(__dirname, '..', 'public', 'testes.json')


    if (!fs.existsSync(publicDirPath)){
        fs.mkdirSync(publicDirPath, {recursive: true})
    }


    try{
        let testes = []

        if (fs.existsSync(filePath)){
            const data = fs.readFileSync(filePath, 'utf-8')
            testes = JSON.parse(data)
        }

        testes.push(testesdata)

        fs.writeFileSync(filePath, JSON.stringify(testes, null, 2), 'utf-8')
        console.log("Testes salvos com sucesso")
    }


    catch(err){
        console.log(`Erro ao salvar teste: ${err}`)
    }

    }
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