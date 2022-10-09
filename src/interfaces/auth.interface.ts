import { RoleType } from '../dtos/user.dto';

export interface PayloadToken {
    role: RoleType;
    sub: string;
}
