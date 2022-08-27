import {Request, Response} from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

export const PermissionMiddleware = (access: string) => {
    return (req: Request, res: Response, next: Function) => {
        const user: User = req['user'];

        const permissions = user.role.permissions;

        if(req.method === 'GET') {
            if(!permissions.some(permission => permission.name === `view_${access}` || permission.name === `edit_${access}`)) {
                return res.status(401).send({
                    message: 'unauthorized'
                });
            }
        } else {
            if(!permissions.some(permission => permission.name === `edit_${access}`)) {
                return res.status(401).send({
                    message: 'unauthorized'
                });
            }
        }

        next();
    }
}