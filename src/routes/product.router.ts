import { ProductController } from '../controllers/product.controller';
import { BaseRouter } from './router';

export class ProductRouter extends BaseRouter<ProductController> {
    constructor() {
        super(ProductController);
    }

    routes(): void {
        this.router.get('/product', (req, res) =>
            this.controller.getProducts(req, res)
        );

        this.router.get('/product/:id', (req, res) =>
            this.controller.getProductById(req, res)
        );

        this.router.post('/product', (req, res) =>
            this.controller.createProduct(req, res)
        );

        this.router.put('/product/:id', (req, res) =>
            this.controller.updateProduct(req, res)
        );

        this.router.delete('/product', (req, res) =>
            this.controller.deleteProduct(req, res)
        );
    }
}
