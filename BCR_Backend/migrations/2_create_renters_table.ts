import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('renters', (table) => {
        table.increments('renter_id').primary();
        table.string('username');
        table.string('email');
        table.string('phone');
        table.text('address');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('renters');
}
