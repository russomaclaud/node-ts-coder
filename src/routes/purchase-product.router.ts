import { PurchaseProductController } from '../controllers/purchase-product.controller';
import { BaseRouter } from './router';
import { PurchaseProductMiddleware } from '../middlewares/purchaseProduct.middleware';

export class PurchaseProductRouter extends BaseRouter<
    PurchaseProductController,
    PurchaseProductMiddleware
> {
    constructor() {
        super(PurchaseProductController, PurchaseProductMiddleware);
    }

    routes(): void {
        this.router.get('/purchase-product', (req, res) =>
            this.controller.getPurchaseProducts(req, res)
        );

        this.router.get('/purchase-product/:id', (req, res) =>
            this.controller.getPurchaseProductById(req, res)
        );

        this.router.post(
            '/purchase-product',
            (req, res, next) => [
                this.middleware.pruchaseProductValidator(req, res, next),
            ],
            (req, res) => this.controller.createPurchaseProduct(req, res)
        );

        this.router.put('/purchase-product/:id', (req, res) =>
            this.controller.updatePurchaseProduct(req, res)
        );

        this.router.delete('/purchase-product/:id', (req, res) =>
            this.controller.deletePurchaseProduct(req, res)
        );
    }
}
