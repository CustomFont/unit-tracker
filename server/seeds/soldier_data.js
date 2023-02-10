/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('soldier_data').del()
  await knex('soldier_data').insert([
    {id: 1,
      DODID: 1544788852,
      last_four_SSN: 8877,
      last_name: 'Costanza',
      first_name: 'George',
      middle_initial: 'M',
      rank: 'CPT',
      organization: '5-73CAV',
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
  },
  ]);
}