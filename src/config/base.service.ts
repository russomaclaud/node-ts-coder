import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { BaseEntiy } from './base.entity';
import { ConfigServer } from './config';

export class BaseService<T extends BaseEntiy> extends ConfigServer {
    public execRepository: Promise<Repository<T>>;

    constructor(private getEntity: EntityTarget<T>) {
        super();

        this.execRepository = this.initRepository(getEntity);
    }

    async initRepository<T extends ObjectLiteral>(
        e: EntityTarget<T>
    ): Promise<Repository<T>> {
        const getConn = await this.initConnect;
        return getConn.getRepository(e);
    }
}

/* Solución del creador */

// import { EntityTarget, Repository } from "typeorm";
// import { AppDS } from "../config";
// import { BaseEntity } from "./base.entity";

// export const useRepository = <T extends BaseEntity>(
//   Entity: EntityTarget<T>
// ) => {
//   return class HandlerRepository {
//     repository!: Repository<T>;
//     constructor() {
//       this.repoInit();
//     }
//     private async repoInit(): Promise<void> {
//       this.repository = (await AppDS.initialize()).getRepository(Entity);
//     }
//   };
// };
