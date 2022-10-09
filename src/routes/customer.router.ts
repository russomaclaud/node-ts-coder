import { CustomerController } from '../controllers/customer.controller';
import { CustomerMiddleware } from '../middlewares/customer.middleware';
import { BaseRouter } from './router';

export class CustomerRouter extends BaseRouter<
    CustomerController,
    CustomerMiddleware
> {
    constructor() {
        super(CustomerController, CustomerMiddleware);
    }

    routes(): void {
        this.router.get('/customer', (req, res) =>
            this.controller.getCustomers(req, res)
        );

        this.router.get('7customer/:id', (req, res) =>
            this.controller.getCustomerById(req, res)
        );

        this.router.post(
            '/customer',
            (req, res, next) => [
                this.middleware.customerValidator(req, res, next),
            ],
            (req, res) => this.controller.craeteCustomer(req, res)
        );

        this.router.put('/customer/:id', (req, res) =>
            this.controller.updateCustomer(req, res)
        );

        this.router.delete('/customer/:id', (req, res) =>
            this.controller.deleteCustomer(req, res)
        );
    }
}
