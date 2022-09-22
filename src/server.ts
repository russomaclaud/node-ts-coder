import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { DataSource } from 'typeorm';

import { UserRouter } from './routes/user.router';
import { ConfigServer } from './config/config';

class Server extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT');

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.dbConnect();

        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): Array<express.Router> {
        return [new UserRouter().router];
    }

    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => console.log('Conect Success'))
            .catch((err) => console.log(err));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto => ${this.port}`);
        });
    }
}

new Server();
