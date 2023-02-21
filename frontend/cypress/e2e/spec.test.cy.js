
describe('Unit Tracker', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should navigate to registration page and fill in data',  () => {
    cy.findByRole('button', {name: 'Registration'})
    .click()
    //broken past this getting a timeedout error
    cy.findAllByRole('textbox').eq(0)
    .click()
    .type('Chandler')
    cy.findAllByRole('textbox').eq(1)
    .click()
    .type('Robert')
    cy.findAllByRole('textbox').eq(2)
    .click()
    .type('R')
    cy.findAllByRole('textbox').eq(3)
    .click()
    .type('111223333')
    cy.findAllByRole('textbox').eq(4)
    .click()
    .type('9876543210')
    // cy.findAllByRole('combobox').eq(0)
    // .click()
  })

  // it('should navigate to splashpage', () => {
  //   cy.findByRole('heading').should('contain', 'Unit Tracker')
  //   cy.findAllByRole('textbox', {name: 'DOD ID'})
  //   .click()
  //   .type('1383391993')
  //   cy.findAllByRole('textbox', {name: 'Social Security Number'})
  //   .click()
  //   .type('111223333')
  // })
})