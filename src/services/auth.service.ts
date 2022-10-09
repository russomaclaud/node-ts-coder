import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { ConfigServer } from '../config/config';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { PayloadToken } from '../interfaces/auth.interface';

export class AuthService extends ConfigServer {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt
    ) {
        super();
    }

    public async validateUser(
        username: string,
        password: string
    ): Promise<UserEntity | null> {
        const userByEmail = await this.userService.findByEmail(username);
        const userByUsername = await this.userService.findByUsername(username);

        if (userByUsername) {
            const isMatch = await bcrypt.compare(
                password,
                userByUsername.password
            );

            if (isMatch) {
                return userByUsername;
            }
        }

        if (userByEmail) {
            const isMatch = await bcrypt.compare(
                password,
                userByEmail.password
            );

            if (isMatch) {
                return userByEmail;
            }
        }

        return null;
    }

    sing(payload: jwt.JwtPayload, secret: any) {
        return this.jwtInstance.sign(payload, secret, { expiresIn: '1h' });
    }

    public async generateJWT(
        user: UserEntity
    ): Promise<{ accessToken: string; user: UserEntity }> {
        const userConsult = await this.userService.findUserWithRol(
            user.id,
            user.role
        );

        const payload: PayloadToken = {
            role: userConsult!.role,
            sub: userConsult!.id,
        };

        if (userConsult) {
            user.password = 'Not permission';
        }

        return {
            accessToken: this.sing(payload, this.getEnvironment('JWT_SECRET')),
            user,
        };
    }
}
