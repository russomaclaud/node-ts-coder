import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { HttpResponse } from '../response/http.response';
import { UserEntity } from '../../entities/user.entity';
import { RoleType } from '../../dtos/user.dto';

export class SharedMiddleware {
    constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

    passAuth(type: string) {
        return passport.authenticate(type, { session: false });
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction) {
        const user = req.user as UserEntity;

        if (user.role !== RoleType.ADMIN) {
            return this.httpResponse.Unauthorized(res, 'No tienes permiso');
        }

        return next();
    }
}
