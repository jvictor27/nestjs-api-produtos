import { Repository, EntityRepository } from "typeorm";
import { Produto } from "./produto.entity";

@EntityRepository(Produto)
export class ProdutoRepository extends Repository<Produto> {

}