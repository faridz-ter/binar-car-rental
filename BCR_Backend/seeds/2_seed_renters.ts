import { Knex } from 'knex';

const tableName = 'renters';
const rentersData = [
    {
        username: 'Reina Kle',
        email: 'reina@example.com',
        phone: '088123123',
        address: 'London Street',
    },
];

export async function seed(knex: Knex): Promise<void> {
    await knex(tableName).del();

    await knex(tableName).insert(rentersData);
}