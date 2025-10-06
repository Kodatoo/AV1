import * as readline from "readline";
import * as path from 'path';
import * as fs from 'fs';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export default class Tipo {
    public nome: string;
    public tipo: TipoPeca;
    public fornecedor: string;
    public status: StatusPeca;
    
    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }

    get getNome(): string { return this.nome; }
    get getTipo(): TipoPeca { return this.tipo; }
    get getFornecedor(): string { return this.fornecedor; }
    get getStatus(): StatusPeca { return this.status; }

    public salvarPeca = (): void =>{
        const pecas = {
            nome: this.getNome,
            tipo: this.getTipo,
            fornecedor: this.getFornecedor,
            status: this.getStatus
        }

        const publicDirPath = path.join(__dirname, '..', 'public')
        const filePath = path.join(__dirname, '..', 'public', 'pecas.json')

        if (!fs.existsSync(publicDirPath)){
            fs.mkdirSync(publicDirPath, {recursive: true})
        }

        try{
            let pecasdata = []

            if (fs.existsSync(filePath)){
                const data = fs.readFileSync(filePath, 'utf-8')
                pecasdata = JSON.parse(data)
            }

            pecasdata.push(pecas)

            fs.writeFileSync(filePath, JSON.stringify(pecasdata, null, 2), 'utf-8')
            console.log("Pecas salvas com sucesso")
            
        }

        catch(err){
            console.log(`Erro ao salvar pecas: ${err}`)
        }
    }

    public atualizarStatus(): void {
        const statusList = Object.values(StatusPeca);

        console.log('\nStatus disponíveis:');
        statusList.forEach((status, index) => {
            console.log(`${index} - ${status}`);
        });

        rl.question('\nDigite o número correspondente ao novo status: ', (resposta) => {
            const index = parseInt(resposta); 

            if (isNaN(index) || index < 0 || index >= statusList.length) { 
                console.log(' Opção Inválida!');
            } else {
                this.status = statusList[index] as StatusPeca;
                console.log(`Status atualizado para: ${this.status}`);
            }

            rl.close(); 
        });

    }

    /**
     * Novo método: Carrega todas as peças do arquivo pecas.json.
     * @returns Um array de objetos, ou um array vazio se o arquivo não existir.
     */
    public static carregar = (): any[] => {
        const filePath = path.join(__dirname, '..', 'public', 'pecas.json')

        if (fs.existsSync(filePath)) {
            try {
                const data = fs.readFileSync(filePath, 'utf-8')
                // Verifica se o arquivo está vazio para evitar erro de JSON.parse
                if (data) {
                    const parsedData = JSON.parse(data)
                    return parsedData
                }
            } catch (err) {
                console.error(`Erro ao ler ou analisar o arquivo pecas.json: ${err}`)
                return []
            }
        }
        // Retorna um array vazio se o arquivo não existir ou estiver vazio/corrompido
        return []
    }
}

export enum StatusPeca {
    EM_PRODUCAO = 'EM_PRODUCAO',
    EM_TRANSPORTE = 'EM_TRANSPORTE',
    PRONTA = 'PRONTA'
}

export enum TipoPeca {
    NACIONAL = 'NACIONAL',
    IMPORTADA = 'IMPORTADA'
}