import Aeronave, {TipoAeronave} from "./aeronaves";
import Tipo, { TipoPeca, StatusPeca } from './peca';

let teste = new  Aeronave('231313', 'f22', TipoAeronave.COMERCIAL, 22, 30)

const minhaPeca = new Tipo('Motor X1', TipoPeca.NACIONAL, 'Fornecedor A', StatusPeca.EM_PRODUCAO);

minhaPeca.atualizarStatus();

teste.salvar();

console.log('Status inicial:', minhaPeca.getStatus);

console.log(teste.detalhes())

