import { Request, Response } from 'express';
import ServiceAuth, { TLoginPayload } from '../../services/ServiceAuth';
import { IUsers } from '../../models/Users';
import bcrypt from "bcrypt";

class ControllerAuth {
    constructor() { }
    async login(req: Request, res: Response) {
        const payload: TLoginPayload = {
            username: req.body.username,
            password: req.body.password,
        };
        try {
            const response = await ServiceAuth.login(payload);
            if (!response.success) {
                return res.status(403).json({
                    data: response.data,
                });
            }
            const token = ServiceAuth.generateToken(response.data as IUsers);

            res.status(200).json({
                data: token,
            });
        } catch (error) {
            res.status(500).json({
                data: error,
            });
        }
    }
    async registerAdmin(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;
            const bcryptPassword = await bcrypt.hash(password, 5);
            await ServiceAuth.register({
                username: username,
                email: email,
                password: bcryptPassword,
                role: 'admin',
            });
            res.status(201).json({
                message: 'Success Register Admin',
            });
        } catch (error) {
            res.status(500).json({
                error : error,
                message: 'Failed Register Admin',
            });
        }
    }
}

export default new ControllerAuth();
