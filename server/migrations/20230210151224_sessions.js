/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('sessions', function (table) {
        table.string('sid', 255).notNullable();
        table.json('sess').notNullable();
        table.timestamp('expired', { useTz: true }).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('sessions')
};
