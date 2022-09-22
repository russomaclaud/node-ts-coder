import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntiy } from '../config/base.entity';
import { CategoryEntity } from './category.entity';
import { PurchaseProductEntity } from './purchases-products.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BaseEntiy {
    @Column()
    productName!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category!: CategoryEntity;

    @OneToMany(
        () => PurchaseProductEntity,
        (purchaseProduct) => purchaseProduct.product
    )
    purchaseProduct!: PurchaseProductEntity[];
}
