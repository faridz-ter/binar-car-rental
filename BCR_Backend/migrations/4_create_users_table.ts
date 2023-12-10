import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('username');
        table.string('email');
        table.string('password');
        table.string('role');
        table.dateTime('created_at').defaultTo(new Date().toISOString());
        table.dateTime('updated_at').defaultTo(new Date().toISOString());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}