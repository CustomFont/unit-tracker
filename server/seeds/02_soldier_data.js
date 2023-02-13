/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('soldier_data').del()
  await knex('soldier_data').insert([
    {
      DODID: 1544788852,
      last_four_SSN: 8877,
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
  },
  {
      DODID: 546894752,
      last_four_SSN: 1234,
      last_name: 'Your',
      first_name: 'Mom',
      middle_initial: 'F',
      rank: 'COL',
      company_id: 2,
      mos: '11B',
      DOB: '1923-01-01',
      weight: 500,
      height: 69,
      hair_color: 'red',
      eye_color: 'blue',
      blood_type: 'O NEG',
      phone_number: 1800696911,
      address: '420 Yo Mammas Place, Jupiter, NY 70469',
      is_leader: false,
  },
    {
      DODID: 1544299382,
      last_four_SSN: 8299,
      last_name: 'Seinfeld',
      first_name: 'Jerry',
      middle_initial: 'J',
      rank: 'COL',
      company_id: 4,
      mos: '17C',
      DOB: '1974-03-14',
      weight: 160.10,
      height: 72,
      hair_color: 'brown',
      eye_color: 'brown',
      blood_type: 'O NEG',
      phone_number: 2125821920,
      address: '1574 Amsterdam Avenue, New York, NY 100038',
      is_leader: true,
  }
  ]);
}