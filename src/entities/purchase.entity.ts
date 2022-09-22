import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntiy } from '../config/base.entity';
import { CustomerEntity } from './customer.entity';
import { PurchaseProductEntity } from './purchases-products.entity';

@Entity({ name: 'purchase' })
export class PurchaseEntity extends BaseEntiy {
    @Column()
    status!: string;

    @Column()
    paymentMethod!: string;

    @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
    @JoinColumn({ name: 'customer_id' })
    customer!: CustomerEntity;

    @OneToMany(
        () => PurchaseProductEntity,
        (purchaseProduct) => purchaseProduct.purchase
    )
    purchaseProduct!: PurchaseProductEntity[];
}
