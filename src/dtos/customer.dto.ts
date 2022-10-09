import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../config/base.dto';
import { UserEntity } from '../entities/user.entity';

export class CustomerDTO extends BaseDTO {
    @IsNotEmpty()
    address!: string;

    @IsNotEmpty()
    dni!: number;

    @IsNotEmpty()
    user!: UserEntity;
}
