/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('company_data').del()
  await knex('company_data').insert({company_name: '5-73CAV', registration_key: 'ACB123'});
  await knex('company_data').insert({ company_name: '1-325AIR', registration_key: '1325AR' });
  await knex('company_data').insert({ company_name: '2-325AIR', registration_key: 'BGD345' });
  await knex('company_data').insert({ company_name: '1-505PIR', registration_key: 'EJD288' });
};


