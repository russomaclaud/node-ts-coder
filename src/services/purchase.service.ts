import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../config/base.service';
import { PurchaseDTO } from '../dtos/purchase.dto';
import { PurchaseEntity } from '../entities/purchase.entity';

export class PurchaseService extends BaseService<PurchaseEntity> {
    constructor() {
        super(PurchaseEntity);
    }

    async findAllPurchase(): Promise<PurchaseEntity[]> {
        return (await this.execRepository).find();
    }

    async findPurchaseById(id: string): Promise<PurchaseEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async createPurchase(body: PurchaseDTO): Promise<PurchaseEntity> {
        return (await this.execRepository).create(body);
    }

    async updatePurchase(
        id: string,
        infoUpdate: PurchaseDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deletePurchase(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
}
