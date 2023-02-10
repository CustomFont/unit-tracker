/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("soldier_data", function (table) {
		table.increments("id");
		table.integer("DODID", 10).notNullable();
		table.integer("last_four_SSN", 4).notNullable();
		table.string("last_name", 255).notNullable();
		table.string("first_name", 255).notNullable();
		table.string("middle_initial", 1).notNullable();
		table.string("rank", 3).notNullable();
		table.string("organization", 255).notNullable();
		table.string("mos", 3).notNullable();
		table.date("DOB").notNullable();
		table.float("weight").notNullable();
		table.integer("height").notNullable();
		table.string("hair_color", 255).notNullable();
		table.string("eye_color", 255).notNullable();
		table.string("blood_type", 255).notNullable();
		table.integer("phone_number", 10).notNullable();
		table.string("address", 255).notNullable();
		table.boolean("is_leader");
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTable("soldier_data")
};
