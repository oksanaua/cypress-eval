const Form_URL = '/#sign-in'
const EMAIL = "zujutest+automation@gmail.com"
const PSW = "TestAuto123"

describe('Forms', () => {
    before(() => {
        cy.visit(Form_URL)

        cy.url()
            .should('eq', Cypress.config().baseUrl + Form_URL)
    })

    it('should display the Autocomplete title', () => {
        cy.get('.MuiTypography-h2')
            .should('contain', 'Welcome to ZUJU KICKOFF')
    })

    it('should display the close button', () => {
        cy.get('button[id="close-button"]').should("be.visible")
    })

    it('should display continue with Google', () => {
        cy.contains('Continue with Google').should("be.visible")
    })

    it('should display continue with Facebook', () => {
        cy.contains('Continue with Facebook').should("be.visible")
    })

    it('should display continue with Apple', () => {
        cy.contains('Continue with Apple').scrollIntoView().should("be.visible")
    })

    it('should display link create a new account', () => {
        cy.contains('Do not have an account?').scrollIntoView()
        cy.contains('Create one').trigger('mouseover').should('be.visible')
    })

    it('should check back to login from forgot password functionality', () => {
        cy.contains('Forgot password?').trigger('mouseover').should('be.visible').click()
        cy.contains('Back to Login').should("be.visible").click()
        cy.get('.MuiTypography-h2')
            .should('contain', 'Welcome to ZUJU KICKOFF')
    })

    it('should check forgot password functionality', () => {
        cy.contains('Forgot password?').trigger('mouseover').should('be.visible').click()
        cy.contains('Forgot your password?').should('be.visible')
        cy.contains('Please enter your email address to search for your account').should('be.visible')
        cy.contains('Email Address').should('be.visible')
        cy.get('input[name="email"]').should("be.visible").type('oks.shkliar@gmail.com')
        cy.get('button[type="submit"]').should("be.visible").click()
        cy.contains('A password reset link will be sent to your email address if it is registered on our platform').should('be.visible')
        cy.contains('Back to Login').should("be.visible").click()
    })

    it('should check empty user credentials', () => {
        cy.get('input[name="email"]').should("be.visible")
        cy.get('input[name="password"]').should("be.visible")
        cy.get('button[type="submit"]').should("be.visible").click()
        cy.contains('Email is required!').should("be.visible").should('have.css', 'color', 'rgb(255, 58, 58)')
        cy.contains('Password is required!').should("be.visible").should('have.css', 'color', 'rgb(255, 58, 58)')
    })

    it('should check invalid user email error message', () => {
        cy.get('input[name="email"]').should("be.visible").type('Hello, World')
        cy.get('button[type="submit"]').should("be.visible").click()
        cy.contains('Email Invalid').should("be.visible").should('have.css', 'color', 'rgb(255, 58, 58)')
        cy.get('input[name="email"]').clear()
    })

    //TODO raise a bug that error message should be displayed instead of reloading a page
    // it('should check invalid user password error message', () => {
    //     cy.get('input[name="email"]').should("be.visible").type(EMAIL)
    //     cy.get('input[name="password"]').should("be.visible").type('12345')
    //     cy.get('button[type="submit"]').should("be.visible").click()
    //     cy.contains('Password Invalid').should("be.visible").should('have.css', 'color', 'rgb(255, 58, 58)')
    //     cy.get('input[name="email"]').clear()
    //})

    it('should login with user credentials', () => {
        cy.login(EMAIL, PSW)
        cy.get('h2[data-cy="page-heading"]').should("be.visible").contains('Upcoming for you')
    })
})