/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("soldier_data", function (table) {
		// table.increments("id");
		table.integer("DODID", 10).notNullable();
		table.string("SSN", 11).notNullable(); // 000-00-0000
		table.string("last_name", 255).notNullable();
		table.string("first_name", 255).notNullable();
		table.string("middle_initial", 1)
		table.string("rank", 3)
		table.integer('company_id');
		table.foreign('company_id','company_id').references('company_data.id'); // yo mama
		table.string("mos", 3)
		table.date("DOB")
		table.float("weight")
		table.integer("height")
		table.string("hair_color", 255)
		table.string("eye_color", 255)
		table.string("blood_type", 255)
		table.integer("phone_number", 10)
		table.string("address", 255)
		table.boolean("is_leader").defaultTo(false);
		table.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("soldier_data", function (table){
			table.dropForeign('company_id').references('company_data.id')
		})
};
// SELECT * FROM soldier_data INNER JOIN company_data ON company_id = company_data.id;
