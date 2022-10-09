import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ProductDTO } from '../dtos/product.dto';
import { HttpResponse } from '../shared/response/http.response';

export class ProductMiddleware {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    productValidator(req: Request, res: Response, next: NextFunction) {
        const { productName, description, price, category } = req.body;

        const valid = new ProductDTO();

        valid.productName = productName;
        valid.description = description;
        valid.price = price;
        valid.category = category;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });
    }
}
