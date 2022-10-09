import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PurchaseService } from '../services/purchase.service';
import { HttpResponse } from '../shared/response/http.response';

export class PurchaseController {
    constructor(
        private readonly purchaseService: PurchaseService = new PurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async getPurchases(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.findAllPurchases();

            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async getPurchaseById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data = await this.purchaseService.findPurchaseById(id);

            if (!data) {
                return this.httpResponse.NotFound(res, 'No existe el dato');
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async createPurchase(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.createPurchase(req.body);

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async updatePurchase(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult =
                await this.purchaseService.updatePurchase(id, req.body);

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

    async deletePurchase(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult =
                await this.purchaseService.deletePurchase(id);

            if (!data.affected) {
                return this.httpResponse.NotFound(
                    res,
                    'Error eliminando el dato'
                );
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }
}
