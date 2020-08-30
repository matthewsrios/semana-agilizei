/// <reference types="cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"

Given(/^que o site não possui registros$/, () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable**',
        status: 200,
        response: []
    }).as('getNewTable')
});

When(/^acessar a listagem$/, () => {
    cy.visit('/WebTable.html')
});

Then(/^devo visualizar a listagem vazia$/, () => {
    cy.get('div[role=row]').should('have.length', 1)
});


Given(/^que o site possui apenas 1 registro$/, () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable**',
        status: 200,
        response: 'fx:webtableGetOnlyOne' //get fixture
    }).as('getNewTable')
});

Then(/^devo visualizar apenas um registro$/, () => {
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
    cy.get('@gridCellPhone').should('contain.text', '5408196723')
});
