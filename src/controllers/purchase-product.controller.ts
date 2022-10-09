import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PurchaseProductService } from '../services/purchase-product.service';
import { HttpResponse } from '../shared/response/http.response';

export class PurchaseProductController {
    constructor(
        private readonly purchaseProductService: PurchaseProductService = new PurchaseProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async getPurchaseProducts(req: Request, res: Response) {
        try {
            const data =
                await this.purchaseProductService.findAllPurchaseProducts();

            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async getPurchaseProductById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data =
                this.purchaseProductService.findPurchaseProductById(id);

            if (!data) {
                return this.httpResponse.NotFound(res, 'No existe el dato');
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async createPurchaseProduct(req: Request, res: Response) {
        try {
            const data =
                await this.purchaseProductService.createPurchaseProduct(
                    req.body
                );

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async updatePurchaseProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult =
                await this.purchaseProductService.updatePurchaseProduct(
                    id,
                    req.body
                );

            if (!data.affected) {
                return this.httpResponse.NotFound(
                    res,
                    'Error actulizando el dato'
                );
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async deletePurchaseProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult =
                await this.purchaseProductService.deletePurchaseProduct(id);

            if (!data.affected) {
                return this.httpResponse.NotFound(
                    res,
                    'Error actualizando el dato'
                );
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
}
