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

}   





export enum NivelPermissao{
    ADMINISTRADOR = 'ADMINISTRADOR',
    ENGENHEIRO = 'ENGENHEIRO',
    OPERADOR = 'OPERADOR'
}