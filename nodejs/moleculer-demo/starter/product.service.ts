import { Service as MoleculerService, Context } from 'moleculer';
import { Service, Action } from 'moleculer-decorators';

interface Product {
    name: string;
    price: number;
}

@Service()
export default class ProductService extends MoleculerService {
    /**
     * curl -X GET "http://localhost:3000/api/person/list" -H "accept: application/json" -H "Content-Type: application/json"
     */
    @Action()
    public async getList(ctx: Context<Product>): Promise<Product> {
        const response = await this.getListDetail(ctx.params);
        console.log(`ProductService.getList: ${response}`);
        return response;
    }

    public async getListDetail(p: Product): Promise<Product> {
        console.log(`ProductService.getListDetail: ${JSON.stringify(p)}`);
        return {
            name: 'Apple',
            price: Math.round(Math.random() * 100),
        };
    }
}

// Same to "export default class ..."
// module.exports = ProductService;
