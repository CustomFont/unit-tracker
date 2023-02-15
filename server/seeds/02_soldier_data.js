/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('soldier_data').del()
  await knex('soldier_data').insert([
    {
      DODID: 1234567890,
      SSN: "$2b$10$7jzUWQScMJBj9IjC0gBTle6XhYG8ss.6WIskm3UaCcssZ3O2SrQs6", // 000000000
      last_name: 'Costanza',
      first_name: 'George',
      middle_initial: 'M',
      rank: 'CPT',
      company_id: 1,
      mos: '25U',
      DOB: '1977-03-14',
      weight: 155.23,
      height: 69,
      hair_color: 'brown',
      eye_color: 'hazel',
      blood_type: 'O POS',
      phone_number: 2125567798,
      address: '1577 Amsterdam Avenue, New York, NY 100038',
      is_leader: false,
  }
  ]);
}