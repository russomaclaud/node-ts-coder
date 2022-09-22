import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntiy } from '../config/base.entity';
import { PurchaseEntity } from './purchase.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'purchases_products' })
export class PurchaseProductEntity extends BaseEntiy {
    @Column()
    quantityProduct!: number;

    @Column()
    totalPrice!: number;

    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
    @JoinColumn({ name: 'purchase_id' })
    purchase!: PurchaseEntity;

    @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct)
    @JoinColumn({ name: 'product_id' })
    product!: ProductEntity;
}
