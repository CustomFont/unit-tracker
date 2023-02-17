
describe('Unit Tracker', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('should navigate to registration page and fill in data',  () => {
    cy.findByRole('button', {name: 'Registration'})
    .click()
    //broken past this getting a timeedout error
    cy.findByRole('textbox', {name: 'Last Name'})
    .click()
    .type('Chandler')
    cy.findByRole('textbox', {name: 'Fisrt Name'})
    .click()
    .type('Robert')
    cy.findByRole('textbox', {name: 'Middle Inital'})
    .click()
    .type('R')
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