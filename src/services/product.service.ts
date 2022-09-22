import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../config/base.service';
import { ProductDTO } from '../dtos/product.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductService extends BaseService<ProductEntity> {
    constructor() {
        super(ProductEntity);
    }

    async findAllProduct(): Promise<ProductEntity[]> {
        return (await this.execRepository).find();
    }

    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async createProduct(body: ProductDTO): Promise<ProductDTO> {
        return (await this.execRepository).create(body);
    }

    async updateProduct(
        id: string,
        infoUpdate: ProductDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
}
