import { Knex } from 'knex';

const tableName = 'users';
const usersData = [
    {
        username: 'superadmin',
        email: 'superadmin@bcr.com',
        password: 'superadmin123',
        role: 'superadmin',
    },
    {
        username: 'Reina Kle',
        email: 'reina@bcr.com',
        password: 'reina123',
        role: 'admin',
    },
    {
        username: 'Taylor Mark',
        email: 'taylor@bcr.com',
        password: 'taylor123',
        role: 'user',
    },
];

export async function seed(knex: Knex): Promise<void> {
    await knex(tableName).del();

    await knex(tableName).insert(usersData);
}
