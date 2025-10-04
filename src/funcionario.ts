import * as path from 'path';
import * as fs from 'fs';


export default class Funcionario {
    public id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    public nivel: NivelPermissao


    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivel: NivelPermissao){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivel = nivel
    }

    // get

    get getId(): string { return this.id }

    get getNome(): string { return this.nome }

    get getTelefone(): string { return this.telefone }

    get getEndereco(): string { return this.endereco }

    get getUsuario(): string { return this.usuario }

    get getSenha(): string { return this.senha }

    get getNivel(): string { return this.nivel }

    public salvar = (): void => {
        const FuncionarioData = {
            id: this.getId,
            nome: this.nome,
            telefone: this.telefone,
            endereco: this.endereco,
            usuario: this.usuario,
            senha: this.senha,
            nivel: this.nivel
        }

        const publicDirPath = path.join(__dirname, '..', 'public')
        const filePath = path.join(__dirname, '..', 'public', 'funcionarios.json')

        if (!fs.existsSync(publicDirPath)) {
            fs.mkdirSync(publicDirPath, { recursive: true })
        }

         try {
            let funcionarios = []

            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf-8')
                funcionarios = JSON.parse(data) // converte json em array de objetos
            }
            
            funcionarios.push(FuncionarioData)

             fs.writeFileSync(filePath, JSON.stringify(funcionarios, null, 2), 'utf-8')
             console.log("Funcionarios salvo com sucesso!")

         }

         catch(err){
            console.log(`Erro ao salvar funcionarios: ${err}`)
         }

        }}



export enum NivelPermissao{
    ADMINISTRADOR = 'ADMINISTRADOR',
    ENGENHEIRO = 'ENGENHEIRO',
    OPERADOR = 'OPERADOR'
}