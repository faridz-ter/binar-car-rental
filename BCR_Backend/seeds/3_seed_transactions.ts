import { Knex } from 'knex';

const tableName = 'transactions';
const transactionsData = [
    {
        renter_id: 1, 
        car_id: 1, 
        checkout_date: '2023-11-21',
        due_date: '2023-12-21',
        return_date: '2023-12-21',
        fine_amount: 50.75,
    },
];

export async function seed(knex: Knex): Promise<void> {
    await knex(tableName).del();

    await knex(tableName).insert(transactionsData);
}