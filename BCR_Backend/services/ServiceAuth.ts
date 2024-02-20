import Users, { IUsers } from '../models/Users';
import bcrypt, { genSaltSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import ClientError from '../utils/ClientError';

import RepositoryAuth, { IRegisterUser } from "../repositories/RepositoryAuth";

export type TLoginPayload = {
    username: string;
    password: string;
};

const JWT_KEY = 'RENTAL_CARS_JWT_KEY';
export interface IServiceAuth {
    login(payload: TLoginPayload): Promise<IUsers | string>;
  }

class ServiceAuth implements IServiceAuth {
    private _repoAuth: RepositoryAuth;
    constructor(repoAuth: RepositoryAuth) {
      this._repoAuth = repoAuth;
    }

    async login(payload: TLoginPayload): Promise<IUsers | string> {
        try {
            const user = await this._repoAuth.findUser(payload.username);

            if (!user) {
                throw new ClientError('user tidak ditemukan', 404);
            }

            const validatePassword = bcrypt.compare(
                payload.password,
                user.password
            );

            if (!validatePassword) {
                throw new ClientError('username dan password anda salah', 404);
            }

            return this.generateToken(user);
        } catch (error) {
            throw error;
        }
        
    }

    async register(payload: IRegisterUser) {
        try {
            const password = this.encryptPassword(payload.password);
            const create = await this._repoAuth.create({
                ...payload,
                password,
              });
            return create;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id: string) {
        const user = await Users.query().findById(id);
        return user;
    }

    generateToken(user: IUsers) {
        const token = jwt.sign({ ...user }, JWT_KEY);
        return token;
    }
    encryptPassword(password: string): string {
        return bcrypt.hashSync(password, genSaltSync(5));
    }
    validateToken(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_KEY) as IUsers;
            return decoded;
        } catch (error) {
            // Handle error ketika token tidak valid
            console.error('Invalid token:', error);
            throw new Error('Invalid token');
        }
    }
    
    validateRole(user: IUsers, role: string) {
        return user.role === role;
    }
}

export default ServiceAuth;
