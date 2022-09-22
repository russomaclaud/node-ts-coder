import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../config/base.dto';

export class ProductDTO extends BaseDTO {
    @IsNotEmpty()
    productName!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    price!: number;
}
