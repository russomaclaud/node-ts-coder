import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne } from 'typeorm';

import { BaseEntiy } from '../config/base.entity';
import { CustomerEntity } from './customer.entity';
import { RoleType } from '../dtos/user.dto';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntiy {
    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Exclude()
    @Column()
    password!: string;

    @Column()
    city!: string;

    @Column()
    province!: string;

    @Column()
    numberPhone!: string;

    @Column()
    image!: string;

    @Column({ type: 'enum', enum: RoleType, nullable: false })
    role!: RoleType;

    @OneToOne(() => CustomerEntity, (customer) => customer.user)
    customer!: CustomerEntity;
}
