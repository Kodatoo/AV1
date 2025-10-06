import * as fs from 'fs'
import path from "path"
import Aeronave from './aeronaves'
import Etapa from "./etapa"
import Peca from './peca'

export default class Relatorio {
    public gerarRelatorio = (aeronave: Aeronave): string => {
        const etapas = Etapa.lerArquivo()
        const pecas = Peca.carregar()

        const rel = `
        RELÁTORIO FINAL DA AERONAVE ${aeronave.getModelo}:

        ${aeronave.detalhes()}

        ETAPAS REALIZADAS:

        ${this.formatarEtapas(etapas)}

        PEÇAS UTILIZADAS:

        ${this.formatarPecas(pecas)}
        `

        return rel
    }

    public salvarEmArquivo = (aeronave: Aeronave): void => {
        const relatorio = this.gerarRelatorio(aeronave)

        const publicDirPath = path.join(__dirname, '..', 'public')
        const filePath = path.join(__dirname, '..', 'public', `relatorio_${aeronave.codigo}.txt`)

        if (!fs.existsSync(publicDirPath)) {
            fs.mkdirSync(publicDirPath, { recursive: true })
        }

        try {
            if (fs.existsSync(filePath)) {
                console.log(`\nRelatório para a aeronave com código ${aeronave.codigo} já existe.`);
            }
            else {
                fs.writeFileSync(filePath, relatorio, 'utf-8')
                console.log(`\nRelatório salvo com sucesso em ${filePath}`)
            }
        }
        catch (err) {
            console.log(`\nErro ao salvar o relatório: ${err}`)
        }
    }

    private formatarEtapas(etapas: any[]): string {
        if (etapas.length === 0) {
            return "Nenhuma etapa realizada."
        }

        return etapas.map((etapa: any) => {
            return `
            Etapa: ${etapa.nome}
            Status: ${etapa.status}
            Data de início: ${etapa.dataInicio}
            Data de conclusão: ${etapa.dataConclusao || "Em andamento"}
            `
        }).join("\n")
    }

    private formatarPecas(pecas: any[]): string {
        if (pecas.length === 0) {
            return "Nenhuma peça utilizada."
        }

        return pecas.map((peca: any) => {
            return `
            Peça: ${peca.nome}
            Tipo: ${peca.tipo}
            Status: ${peca.status}
            `
        }).join("\n")
    }
}