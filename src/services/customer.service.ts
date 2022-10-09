import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../config/base.service';
import { CustomerDTO } from '../dtos/customer.dto';
import { UserDTO } from '../dtos/user.dto';
import { CustomerEntity } from '../entities/customer.entity';

export class CustomerService extends BaseService<CustomerEntity> {
    constructor() {
        super(CustomerEntity);
    }

    async findAllCustomer(): Promise<CustomerEntity[]> {
        return (await this.execRepository).find();
    }

    async findCustomerById(id: string): Promise<CustomerEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async createCustomer(body: CustomerDTO): Promise<CustomerEntity> {
        return (await this.execRepository).save(body);
    }

    async updateCustomer(
        id: string,
        infoUpdate: UserDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deleteCustomer(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }
}
