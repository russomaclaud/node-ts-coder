import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { DataSource } from 'typeorm';

import { UserRouter } from './routes/user.router';
import { ConfigServer } from './config/config';
import { CategoryRouter } from './routes/category.router';
import { CustomerRouter } from './routes/customer.router';
import { ProductRouter } from './routes/product.router';
import { PurchaseProductRouter } from './routes/purchase-product.router';
import { PurchaseRouter } from './routes/purchase.router';
import { LoginStrategy } from './strategies/login.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthRouter } from './routes/auth.router';

class Server extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT');

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.passportUse();

        this.dbConnect();

        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): Array<express.Router> {
        return [
            new UserRouter().router,
            new CategoryRouter().router,
            new CustomerRouter().router,
            new ProductRouter().router,
            new PurchaseProductRouter().router,
            new PurchaseRouter().router,
            new AuthRouter().router,
        ];
    }

    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use];
    }

    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => console.log('Conect Success'))
            .catch((err) => console.error(err));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto => ${this.port}`);
        });
    }
}

new Server();
