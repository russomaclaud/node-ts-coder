import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

class Server {
    public app: express.Application = express();
    private port: number = 8000;

    constructor() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.get('/api', (_, res) => {
            res.status(200).json({ message: 'Hey que maiz!!!' });
        });

        this.listen();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto => ${this.port}`);
        });
    }
}

new Server();
