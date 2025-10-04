import * as readline from "readline";

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

    public atualizarStatus(): void {
        const statusList = Object.values(StatusPeca);

        console.log('\nStatus disponíveis:');
        statusList.forEach((status, index) => {
            console.log(`${index} - ${status}`);
        });

        rl.question('\nDigite o número correspondente ao novo status: ', (resposta) => {
            const index = parseInt(resposta); //parse converte a resposta que é string em inteiro

            if (isNaN(index) || index < 0 || index >= statusList.length) { // isnan verificar se o valor não é numero
                console.log(' Opção Inválida!');
            } else {
                this.status = statusList[index] as StatusPeca;
                console.log(`Status atualizado para: ${this.status}`);
            }

            rl.close(); // termina o input
        });
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
