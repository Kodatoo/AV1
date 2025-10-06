import path from 'path'
import * as fs from 'fs'
import * as readline from 'readline'

import Aeronave, {TipoAeronave} from './aeronaves'
import Funcionario, { NivelPermissao } from './funcionario'
import Peca, { StatusPeca, TipoPeca } from './peca'
import Teste, { ResultadoTeste, TipoTeste } from './teste'
import Etapa, { StatusEtapa } from './etapa'
import Relatorio from './relatorio'

// ==============================
// MENU PRINCIPAL
// ==============================
const menuInicial = (): void => {
    // console.clear()
    console.log(`
===========================
  SISTEMA DE CADASTROS
===========================

1. Aeronave
2. Funcionário
3. Peça
4. Teste
5. Etapa
6. Gerar relatório

`)
}

// ==============================
// CLASSE INTERAÇÃO
// ==============================
export default class Interacao {
    private rl: readline.Interface

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    // Lê input do usuário
    private pedirInput(question: string, callback: (res: string) => void): void {
        this.rl.question(question, callback)
    }

    // Inicia o menu
    public iniciar(): void {
        menuInicial()

        this.pedirInput("Escolha uma opção: ", (res) => {
            switch (res.trim()) {
                case '1': this.criarAeronave(); break
                case '2': this.criarFuncionario(); break
                case '3': this.criarPeca(); break
                case '4': this.criarTeste(); break
                case '5': this.criarEtapa(); break
                case '6': this.criarRelatorio(); break
                default:
                    console.log("\n❌ Opção inválida. Tente novamente.\n")
                    this.iniciar()
                    break
            }
        })
    }

    // ==============================
    // AERONAVE
    // ==============================
    public criarAeronave(): void {
        this.pedirInput("Modelo da aeronave: ", (modelo) => {
            this.pedirInput("Capacidade da aeronave: ", (capacidade) => {
                this.pedirInput("Alcance da aeronave (em km): ", (alcance) => {
                    this.selecionarTipoAeronave((tipo) => {
                        const aeronave = new Aeronave(
                            '0',
                            modelo,
                            tipo,
                            parseInt(capacidade),
                            parseInt(alcance)
                        )

                        aeronave.salvar()
                        console.log('\n✅ Aeronave cadastrada com sucesso.\n')
                        aeronave.detalhes()

                        this.iniciar()
                    })
                })
            })
        })
    }

    private selecionarTipoAeronave(callback: (tipo: TipoAeronave) => void): void {
        console.log("\nSelecione o tipo da aeronave:")
        console.log("1 - COMERCIAL")
        console.log("2 - MILITAR")

        this.pedirInput("Digite o número correspondente: ", (escolha) => {
            switch (escolha.trim()) {
                case '1': callback(TipoAeronave.COMERCIAL); break
                case '2': callback(TipoAeronave.MILITAR); break
                default:
                    console.log("❌ Opção inválida. Digite 1 ou 2.")
                    this.selecionarTipoAeronave(callback)
            }
        })
    }

    // ==============================
    // FUNCIONÁRIO
    // ==============================
    public criarFuncionario(): void {
        this.pedirInput("Nome do funcionário: ", (nome) => {
            this.pedirInput("Telefone: ", (telefone) => {
                this.pedirInput("Endereço: ", (endereco) => {
                    this.pedirInput("Usuário: ", (usuario) => {
                        this.pedirInput("Senha: ", (senha) => {
                            this.selecionarNivelPermissao((nivelPermissao) => {
                                const funcionario = new Funcionario(
                                    '0', nome, telefone, endereco, usuario, senha, nivelPermissao
                                )

                                funcionario.salvar()
                                console.log("\n✅ Funcionário cadastrado com sucesso.\n")
                                console.log(`
ID: ${funcionario.getId}
Nome: ${funcionario.getNome}
Telefone: ${funcionario.getTelefone}
Endereço: ${funcionario.getEndereco}
Usuário: ${funcionario.getUsuario}
Permissão: ${funcionario.getNivel}
`)

                                this.iniciar()
                            })
                        })
                    })
                })
            })
        })
    }

    private selecionarNivelPermissao(callback: (nivel: NivelPermissao) => void): void {
        console.log("\nSelecione o nível de permissão:")
        console.log("1 - ADMINISTRADOR")
        console.log("2 - ENGENHEIRO")
        console.log("3 - OPERADOR")

        this.pedirInput("Digite o número correspondente: ", (escolha) => {
            switch (escolha.trim()) {
                case '1': callback(NivelPermissao.ADMINISTRADOR); break
                case '2': callback(NivelPermissao.ENGENHEIRO); break
                case '3': callback(NivelPermissao.OPERADOR); break
                default:
                    console.log("❌ Opção inválida. Digite 1, 2 ou 3.")
                    this.selecionarNivelPermissao(callback)
            }
        })
    }

    // ==============================
    // PEÇA
    // ==============================
    public criarPeca(): void {
        this.pedirInput('Nome da peça: ', (nome) => {
            this.pedirInput('Fornecedor: ', (fornecedor) => {
                this.selecionarTipoPeca((tipo) => {
                    this.selecionarStatusPeca((status) => {
                        const peca = new Peca(nome, tipo, fornecedor, status)

                        peca.salvarPeca()
                        console.log("\n✅ Peça cadastrada com sucesso.\n")
                        console.log(`
Nome: ${peca.getNome}
Tipo: ${peca.getTipo}
Fornecedor: ${peca.getFornecedor}
Status: ${peca.getStatus}
`)
                        this.iniciar()
                    })
                })
            })
        })
    }

    private selecionarTipoPeca(callback: (tipo: TipoPeca) => void): void {
        console.log("\nTipo da peça:")
        console.log("1 - NACIONAL")
        console.log("2 - IMPORTADA")

        this.pedirInput("Digite o número correspondente: ", (escolha) => {
            switch (escolha.trim()) {
                case '1': callback(TipoPeca.NACIONAL); break
                case '2': callback(TipoPeca.IMPORTADA); break
                default:
                    console.log("❌ Opção inválida.")
                    this.selecionarTipoPeca(callback)
            }
        })
    }

    private selecionarStatusPeca(callback: (status: StatusPeca) => void): void {
        console.log("\nStatus da peça:")
        console.log("1 - EM PRODUÇÃO")
        console.log("2 - EM TRANSPORTE")
        console.log("3 - PRONTA")

        this.pedirInput("Digite o número correspondente: ", (escolha) => {
            switch (escolha.trim()) {
                case '1': callback(StatusPeca.EM_PRODUCAO); break
                case '2': callback(StatusPeca.EM_TRANSPORTE); break
                case '3': callback(StatusPeca.PRONTA); break
                default:
                    console.log("❌ Opção inválida.")
                    this.selecionarStatusPeca(callback)
            }
        })
    }

    // ==============================
    // TESTE
    // ==============================
    public criarTeste(): void {
        this.selecionarTipoTeste((tipo) => {
            this.selecionarResultadoTeste((resultado) => {
                const teste = new Teste(tipo, resultado)
                teste.salvar()

                console.log("\n✅ Teste criado com sucesso.\n")
                console.log(`
Tipo: ${teste.getTipo}
Resultado: ${teste.getResultado}
`)
                this.iniciar()
            })
        })
    }

    private selecionarTipoTeste(callback: (tipo: TipoTeste) => void): void {
        console.log("\nTipo de teste:")
        console.log("1 - ELÉTRICO")
        console.log("2 - HIDRÁULICO")
        console.log("3 - AERODINÂMICO")

        this.pedirInput("Digite o número correspondente: ", (escolha) => {
            switch (escolha.trim()) {
                case '1': callback(TipoTeste.ELETRICO); break
                case '2': callback(TipoTeste.HIDRAULICO); break
                case '3': callback(TipoTeste.AERODINAMICO); break
                default:
                    console.log("❌ Opção inválida.")
                    this.selecionarTipoTeste(callback)
            }
        })
    }

    private selecionarResultadoTeste(callback: (resultado: ResultadoTeste) => void): void {
        console.log("\nResultado do teste:")
        console.log("1 - APROVADO")
        console.log("2 - REPROVADO")

        this.pedirInput("Digite o número correspondente: ", (escolha) => {
            switch (escolha.trim()) {
                case '1': callback(ResultadoTeste.APROVADO); break
                case '2': callback(ResultadoTeste.REPROVADO); break
                default:
                    console.log("❌ Opção inválida.")
                    this.selecionarResultadoTeste(callback)
            }
        })
    }

    // ==============================
    // ETAPA
    // ==============================
    public criarEtapa(): void {
        this.pedirInput("Nome da etapa: ", (nome) => {
            this.pedirInput("Prazo da etapa (em dias): ", (prazo) => {
                this.selecionarStatusEtapa((status) => {
                    this.carregarFuncionarios((funcionarios) => {
                        this.selecionarFuncionarios(funcionarios, (selecionados) => {
                            const etapa = new Etapa(nome, prazo, status, selecionados)
                            etapa.gravarEmArquivo()

                            console.log("\n✅ Etapa criada com sucesso!\n")
                            etapa.exibirEquipe()

                            this.iniciar()
                        })
                    })
                })
            })
        })
    }

    private selecionarStatusEtapa(callback: (status: StatusEtapa) => void): void {
        console.log("\nStatus da etapa:")
        console.log("1 - PENDENTE")
        console.log("2 - ANDAMENTO")
        console.log("3 - CONCLUÍDA")

        this.pedirInput("Digite o número correspondente: ", (escolha) => {
            switch (escolha.trim()) {
                case '1': callback(StatusEtapa.PENDENTE); break
                case '2': callback(StatusEtapa.ANDAMENTO); break
                case '3': callback(StatusEtapa.CONCLUIDA); break
                default:
                    console.log("❌ Opção inválida.")
                    this.selecionarStatusEtapa(callback)
            }
        })
    }

    private carregarFuncionarios(callback: (funcionarios: Funcionario[]) => void): void {
        const filePath = path.join(__dirname, '..', 'public', 'funcionarios.json')

        if (!fs.existsSync(filePath)) {
            console.log("⚠️  Nenhum funcionário cadastrado.")
            callback([])
            return
        }

        const data = fs.readFileSync(filePath, 'utf-8')
        const jsonData = JSON.parse(data)

        const funcionarios = jsonData.slice(1).map((item: any) => new Funcionario(
            item.id,
            item.nome,
            item.telefone,
            item.endereco,
            item.usuario,
            item.senha,
            item.nivelPermissao
        ))

        callback(funcionarios)
    }

    private selecionarFuncionarios(funcionarios: Funcionario[], callback: (selecionados: Funcionario[]) => void): void {
        if (funcionarios.length === 0) {
            console.log("⚠️  Nenhum funcionário disponível para associar.")
            callback([])
            return
        }

        console.log("\nSelecione os funcionários que participarão da etapa:")

        funcionarios.forEach((f, i) => {
            console.log(`${i + 1} - ${f.getNome} (ID: ${f.getId})`)
        })
        console.log("0 - Finalizar seleção")

        const selecionados: Funcionario[] = []

        const selecionar = (): void => {
            this.pedirInput("Escolha o número (ou 0 para finalizar): ", (res) => {
                const index = parseInt(res) - 1

                if (index === -1) return callback(selecionados)

                if (index >= 0 && index < funcionarios.length) {
                    const f = funcionarios[index]
                    if (!selecionados.includes(f)) {
                        selecionados.push(f)
                        console.log(`✅ ${f.getNome} adicionado.`)
                    } else {
                        console.log(`⚠️  ${f.getNome} já foi adicionado.`)
                    }
                } else {
                    console.log("❌ Opção inválida.")
                }
                selecionar()
            })
        }

        selecionar()
    }

    // ==============================
    // RELATÓRIO
    // ==============================
    public criarRelatorio(): void {
        this.pedirInput("Digite o código da aeronave: ", (codigoInput) => {
            const codigo = parseInt(codigoInput)
            const aeronaves = Aeronave.carregar()
            const encontrada = aeronaves.find((a: any) => a.codigo === codigo)

            if (encontrada) {
                const aeronave = new Aeronave(
                    encontrada.codigo,
                    encontrada.modelo,
                    encontrada.tipo,
                    encontrada.capacidade,
                    encontrada.alcance
                )

                const relatorio = new Relatorio()
                relatorio.salvarEmArquivo(aeronave)
            } else {
                console.log("❌ Aeronave não encontrada.")
            }

            this.iniciar()
        })
    }
}
if (require.main === module) {
    const interacao = new Interacao()
    interacao.iniciar()
}
