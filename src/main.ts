import Aeronave, {TipoAeronave} from "./aeronaves";

let teste = new  Aeronave('231313', 'f22', TipoAeronave.COMERCIAL, 22, 30)

console.log(teste.detalhes())