import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { CategoryDTO } from '../dtos/category.dto';
import { HttpResponse } from '../shared/response/http.response';

export class CategoryMiddleware {
    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    categoryValidator(req: Request, res: Response, next: NextFunction) {
        const { categoryName } = req.body;

        const valid = new CategoryDTO();

        valid.categoryName = categoryName;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });
    }
}
