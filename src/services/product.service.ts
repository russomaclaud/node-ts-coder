import { DeleteResult, UpdateResult } from 'typeorm';
import QueryString from 'qs';

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

    async findProductByName(
        productName:
            | string
            | string[]
            | QueryString.ParsedQs
            | QueryString.ParsedQs[]
    ): Promise<ProductEntity[] | []> {
        return (await this.execRepository)
            .createQueryBuilder('products')
            .where('products.productName like :productName', {
                productName: `%${productName}%`,
            })
            .getMany();
    }

    async createProduct(body: ProductDTO): Promise<ProductDTO> {
        return (await this.execRepository).save(body);
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
