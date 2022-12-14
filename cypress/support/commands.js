// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const Form_URL = '/#sign-in'
const login = (username, password) => {
    Cypress.log({
        displayName: 'COGNITO LOGIN',
        message: [`🔐 Authenticating | ${username}`],
        autoEnd: false,
    })

    cy.visit(Form_URL)
    cy.get('input[name="email"]').should("be.visible").type(username)
    cy.get('input[name="password"]').should("be.visible").type(password)
    cy.get('button[type="submit"]').should("be.visible").click()

    cy.wait(1000)
}

Cypress.Commands.add("login", (email, password) => login(email, password))