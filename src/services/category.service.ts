import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../config/base.service';
import { CategoryDTO } from '../dtos/category.dto';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryService extends BaseService<CategoryEntity> {
    constructor() {
        super(CategoryEntity);
    }

    async findAllCategory(): Promise<CategoryEntity[]> {
        return (await this.execRepository).find();
    }

    async findCategoryById(id: string): Promise<CategoryEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async findCategoryWithProduct(
        categoryId: string
    ): Promise<CategoryEntity | null> {
        return (await this.execRepository)
            .createQueryBuilder('category')
            .leftJoinAndSelect('category.products', 'products')
            .where({ id: categoryId })
            .getOne();
    }

    async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
        return (await this.execRepository).save(body);
    }

    async updateCategory(
        id: string,
        infoUpdate: CategoryDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deleteCategory(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
}
