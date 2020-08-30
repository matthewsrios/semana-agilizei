/// <reference types="cypress" />

const { Chance } = require("chance");

let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
       cy.server()
       cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**' )
            .as('postNewtable')
       cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**' )
            .as('postUsertable')
       cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**' )
            .as('getNewtable')
      
        cy.visit('/Register.html')

        cy.get('input[ng-model=FirstName]').type(chance.first())
        cy.get('input[ng-model=LastName]').type(chance.last())
        cy.get('input[type=email][ng-model=EmailAdress]').type(chance.email())
        cy.get('input[ng-model=Phone]').type(chance.phone({ formatted: false }))
        cy.get('input[ng-model=radiovalue][value=Male]').check()
        cy.get('#checkbox2').check()
        cy.get('#Skills').select('PHP')
        cy.get('#countries').select('Brazil')
        cy.get('#country').select('Australia', { force: true })
        cy.get('#yearbox').select('1995')
        cy.get('select[ng-model=monthbox]').select('May')
        cy.get('#daybox').select('10')
        cy.get('#firstpassword').type('Teste@123')
        cy.get('#secondpassword').type('Teste@123')

        cy.get('#imagesrc').attachFile('imagem.png')
        cy.get('#submitbtn').click()

        cy.wait('@postNewtable').then(response => {
            expect(response.status).to.eq(200)
        })

        cy.wait('@getNewtable').then(response => {
            expect(response.status).to.eq(200)
        })

        cy.wait('@postUsertable').then(response => {
            expect(response.status).to.eq(200)
        })

        cy.url().should('contain', 'WebTable')
    });
});