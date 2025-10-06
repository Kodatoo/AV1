import * as path from 'path'
import * as fs from 'fs'

export default class Funcionario {
    public id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    public nivel: NivelPermissao

    constructor(
        id: string,
        nome: string,
        telefone: string,
        endereco: string,
        usuario: string,
        senha: string,
        nivel: NivelPermissao
    ) {
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivel = nivel
    }

    // Getters

    get getId(): string { return this.id }
    get getNome(): string { return this.nome }
    get getTelefone(): string { return this.telefone }
    get getEndereco(): string { return this.endereco }
    get getUsuario(): string { return this.usuario }
    get getSenha(): string { return this.senha }
    get getNivel(): string { return this.nivel }

    // Salvar funcionário no arquivo JSON
    public salvar = (): void => {
        const funcionarioData = {
            id: this.getId,
            nome: this.getNome,
            telefone: this.getTelefone,
            endereco: this.getEndereco,
            usuario: this.getUsuario,
            senha: this.getSenha,
            nivel: this.getNivel
        }

        const publicDirPath = path.join(__dirname, '..', 'public')
        const filePath = path.join(publicDirPath, 'funcionarios.json')

        if (!fs.existsSync(publicDirPath)) {
            fs.mkdirSync(publicDirPath, { recursive: true })
        }

        try {
            let funcionarios: any[] = []

            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf-8')
                funcionarios = JSON.parse(data)
            }

            funcionarios.push(funcionarioData)

            fs.writeFileSync(filePath, JSON.stringify(funcionarios, null, 2), 'utf-8')
            console.log("Funcionário salvo com sucesso!")
        } catch (err) {
            console.error(`Erro ao salvar funcionário: ${err}`)
        }
    }

    // Método estático para carregar todos os funcionários
    public static carregar = (): Funcionario[] => {
        const filePath = path.join(__dirname, '..', 'public', 'funcionarios.json')

        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8')
            const lista = JSON.parse(data)

            return lista.map((f: any) => new Funcionario(
                f.id,
                f.nome,
                f.telefone,
                f.endereco,
                f.usuario,
                f.senha,
                f.nivel
            ))
        }

        return []
    }
}

export enum NivelPermissao {
    ADMINISTRADOR = 'ADMINISTRADOR',
    ENGENHEIRO = 'ENGENHEIRO',
    OPERADOR = 'OPERADOR'
}
