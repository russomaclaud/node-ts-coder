import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../dtos/user.dto';
import { SharedMiddleware } from '../shared/middlewares/shared.middleware';
import { HttpResponse } from '../shared/response/http.response';

export class UserMiddleware extends SharedMiddleware {
    constructor() {
        super();
    }

    UserValidator(req: Request, res: Response, next: NextFunction) {
        const {
            name,
            lastname,
            username,
            email,
            password,
            city,
            province,
            numberPhone,
            image,
            role,
        } = req.body;

        const valid = new UserDTO();

        valid.name = name;
        valid.lastname = lastname;
        valid.username = username;
        valid.email = email;
        valid.password = password;
        valid.city = city;
        valid.province = province;
        valid.numberPhone = numberPhone;
        valid.image = image;
        valid.role = role;

        validate(valid).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.Error(res, err);
            } else {
                next();
            }
        });
    }
}
