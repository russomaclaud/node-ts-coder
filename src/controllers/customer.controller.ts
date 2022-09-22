import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CustomerService } from '../services/customer.service';
import { HttpResponse } from '../shared/response/http.response';

export class CustomerController {
    constructor(
        private readonly customerService: CustomerService = new CustomerService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async getCustomers(req: Request, res: Response) {
        try {
            const data = await this.customerService.findAllCustomer();

            if (data.length === 0) {
                return this.httpResponse.NotFound(res, 'No existen datos');
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async getCustomerById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data = await this.customerService.findCustomerById(id);

            if (!data) {
                return this.httpResponse.NotFound(res, 'No existe el dato');
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async craeteCustomer(req: Request, res: Response) {
        try {
            const data = await this.customerService.createCustomer(req.body);

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async updateCustomer(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: UpdateResult =
                await this.customerService.updateCustomer(id, req.body);

            if (!data.affected) {
                return this.httpResponse.NotFound(
                    res,
                    'Error actualizando dato'
                );
            }

            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        }
    }

    async deleteCustomer(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const data: DeleteResult =
                await this.customerService.deleteCustomer(id);

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
