/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('cars', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('price');
        table.string('picture');
        table.datetime('start_rent', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime('finish_rent');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('cars');
};
