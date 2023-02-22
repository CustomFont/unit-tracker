/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('company_data', function (table) {
        table.increments('id').notNullable();
        table.string('company_name', 255).notNullable();
        table.string('registration_key', 6).notNullable();
    }) 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('company_data')
};
