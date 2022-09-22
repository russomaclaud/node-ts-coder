import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntiy } from '../config/base.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntiy {
    @Column()
    categoryName!: string;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products!: ProductEntity[];
}
