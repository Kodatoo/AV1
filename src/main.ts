import Aeronave, {TipoAeronave} from "./aeronaves";
import Funcionario, { NivelPermissao } from "./funcionario";
import Tipo, { TipoPeca, StatusPeca } from './peca';

let teste = new  Aeronave('231313', 'f22', TipoAeronave.COMERCIAL, 22, 30)

const minhaPeca = new Tipo('Motor X1', TipoPeca.NACIONAL, 'Fornecedor A', StatusPeca.EM_PRODUCAO);

let funcionariosteste = new Funcionario("1", "Koda", "1293810302130", "Rua dos carai", "UsuarioMASTER","ratos", NivelPermissao.ENGENHEIRO )



teste.salvar();

console.log('Status inicial:', minhaPeca.getStatus);


console.log(teste.detalhes());

funcionariosteste.salvar();

console.log(funcionariosteste);

minhaPeca.atualizarStatus();

