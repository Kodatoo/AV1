import * as fs from 'fs'
import path from 'path'
import finaliza from '../interfaces/finaliza'
import iniciar from '../interfaces/iniciar'
import salva from '../interfaces/salvar'
import Funcionario from './funcionario'

export default class Etapa implements iniciar, finaliza,salva {
    public nome: string
    public prazo: string
    public status: StatusEtapa
    public funcionarios: Funcionario[]
    public etapaAnterior?: Etapa

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Funcionario[], etapaAnterior?: Etapa) {
        this.nome = nome
        this.prazo = prazo
        this.status = status
        this.funcionarios = funcionarios
        this.etapaAnterior = etapaAnterior
    }

    // Getters

    get getNome(): string {
        return this.nome
    }

    get getPrazo(): string {
        return this.prazo
    }

    get getStatus(): StatusEtapa {
        return this.status
    }

    get getFuncionarios(): Funcionario[] {
        return this.funcionarios
    }

    // Métodos

    public comecarEtapa = (): void => {
        if (this.etapaAnterior && this.etapaAnterior.getStatus !== StatusEtapa.CONCLUIDA) {
            console.warn(`Etapa "${this.nome}" não pode ser iniciada antes da conclusão da etapa anterior "${this.etapaAnterior.getNome}".`)
            return
        }

        if (this.status === StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO
            console.log(`Etapa "${this.nome}" agora está em andamento.`)
        } else {
            console.warn(`Etapa "${this.nome}" não pode ser iniciada, pois já foi iniciada ou concluída.`)
        }
    }

    public concluirEtapa = (): void => {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA
            console.log(`Etapa "${this.nome}" foi finalizada com sucesso.`)
        } else {
            console.warn(`Etapa "${this.nome}" não pode ser finalizada pois não está em andamento.`)
        }
    }

    public adicionarFuncionario = (f: Funcionario): void => {
        const jaExiste = this.funcionarios.find(func => func.getId === f.getId)

        if (jaExiste) {
            console.warn(`Funcionário ${f.getId} já está atribuído à etapa "${this.nome}".`)
        } else {
            this.funcionarios.push(f)
            console.log(`Funcionário ${f.getId} (${f.getNome}) adicionado à etapa "${this.nome}".`)
            this.exibirEquipe()
        }
    }

    public exibirEquipe = (): void => {
        console.log(`Equipe da etapa "${this.nome}":`)
        console.table(
            this.funcionarios.map(f => ({
                ID: f.getId,
                Nome: f.getNome
            }))
        )
    }

    public gravarEmArquivo = (): void => {
        const dadosEtapa = {
            nome: this.nome,
            prazo: this.prazo,
            status: this.status,
            funcionarios: this.funcionarios
        }

        const pastaPublica = path.join(__dirname, '..', 'public')
        const caminhoArquivo = path.join(pastaPublica, 'etapas.json')

        if (!fs.existsSync(pastaPublica)) {
            fs.mkdirSync(pastaPublica, { recursive: true })
        }

        try {
            let etapasRegistradas: any[] = []

            if (fs.existsSync(caminhoArquivo)) {
                const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8')
                etapasRegistradas = JSON.parse(conteudo)
            }

            etapasRegistradas.push(dadosEtapa)

            fs.writeFileSync(caminhoArquivo, JSON.stringify(etapasRegistradas, null, 2), 'utf-8')
            console.log(`Etapa "${this.nome}" salva com sucesso.`)
        } catch (erro) {
            console.error(`Erro ao tentar salvar a etapa: ${erro}`)
        }
    }

    public static lerArquivo = (): any[] => {
        const caminho = path.join(__dirname, '..', 'public', 'etapas.json')

        if (fs.existsSync(caminho)) {
            const conteudo = fs.readFileSync(caminho, 'utf-8')
            return JSON.parse(conteudo)
        }

        return []
    }
}

export enum StatusEtapa {
    PENDENTE = 'PENDENTE',
    ANDAMENTO = 'ANDAMENTO',
    CONCLUIDA = 'CONCLUIDA'
}
