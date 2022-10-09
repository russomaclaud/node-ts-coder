import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductService } from '../services/product.service';
import { HttpResponse } from '../shared/response/http.response';

export class ProductController {
    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async getProducts(req: Request, res: Response) {
        try {
            const data = await this.productService.findAllProduct();

            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async getProductById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data = await this.productService.findProductById(id);

            if (!data) {
                return this.httpResponse.NotFound(res, 'No existe elo dato');
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async findProductByName(req: Request, res: Response) {
        const { search } = req.query;
        try {
            if (search !== undefined) {
                const data = await this.productService.findProductByName(
                    search
                );

                if (!data) {
                    return this.httpResponse.NotFound(res, 'No existe dato');
                }

                return this.httpResponse.Ok(res, data);
            }
        } catch (e) {
            console.log(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async updateProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult = await this.productService.updateProduct(
                id,
                req.body
            );

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

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult = await this.productService.deleteProduct(
                id
            );

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
