import database from '../config/database';
import { Model } from 'objection';

Model.knex(database);

export interface IUsers {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
    updated_at: string;
}

class Users extends Model {
    static get tableName() {
        return 'users';
    }
    static get idColumn() {
        return 'user_id';
    }
    static get jsonSchema(): object {
        return {
          type: 'object',
          required: ['username', 'email', 'password', 'role'],
          properties: {
            user_id: { type: 'integer' },
            username: { type: 'string', minLength: 1, maxLength: 255 },
            email: { type: 'string', minLength: 1, maxLength: 255 },
            password: { type: 'string', minLength: 1, maxLength: 255 },
            role: { type: 'string', minLength: 1, maxLength: 10 },
          },
        };
      }
}

export default Users;
