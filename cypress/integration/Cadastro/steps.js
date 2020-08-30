/// <reference types="cypress" />
import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"

const { Chance } = require("chance");

let chance = new Chance();

Given(/^que o acesso o site$/, () => {
    cy.server()
    cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('newTable')
    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable**').as('getUserTable')
    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable**').as('userTable')
    cy.visit('/Register.html')
});

When(/^informar meus dados$/, () => {
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
});

When(/^salvar$/, () => {
    cy.get('#submitbtn').click()
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@getUserTable').then(response => {
        expect(response.status).to.eq(200)
    })

    cy.wait('@newTable').then(response => {
        expect(response.status).to.eq(200)
    })

    cy.wait('@userTable').then(response => {
        expect(response.status).to.eq(200)
    })

    cy.url().should('contain', 'WebTable')
});

