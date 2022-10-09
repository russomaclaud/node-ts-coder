import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { PurchaseProductDTO } from '../dtos/purchase-product.dto';
import { HttpResponse } from '../shared/response/http.response';

export class PurchaseProductMiddleware {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    pruchaseProductValidator(req: Request, res: Response, next: NextFunction) {
        const { quantityProduct, totalPrice, purchase, product } = req.body;

        const valid = new PurchaseProductDTO();

        valid.quantityProduct = quantityProduct;
        valid.totalPrice = totalPrice;
        valid.purchase = purchase;
        valid.product = product;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });
    }
}
