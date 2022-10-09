import {
    Strategy as JwtStrat,
    StrategyOptions,
    ExtractJwt,
} from 'passport-jwt';

import { AuthService } from '../services/auth.service';
import { PayloadToken } from '../interfaces/auth.interface';
import { PassportUse } from '../utils/passport.use';

export class JwtStrategy extends AuthService {
    constructor() {
        super();
    }

    async validate(payload: PayloadToken, done: any) {
        return done(null, payload);
    }

    get use() {
        return PassportUse<
            JwtStrat,
            StrategyOptions,
            (payload: PayloadToken, done: any) => Promise<PayloadToken>
        >(
            'jwt',
            JwtStrat,
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: this.getEnvironment('JWT_SECRET'),
            },
            this.validate
        );
    }
}
