const Form_URL = '/#sign-in'
const EMAIL = "zujutest+automation@gmail.com"
const PSW = "TestAuto123"

describe('Forms', () => {
    before(() => {
        cy.visit(Form_URL)
        cy.url()
            .should('eq', Cypress.config().baseUrl + Form_URL)
    })

    it('should mark Manchester City as a favourite', () => {
        cy.login(EMAIL, PSW)
        cy.get('h2[data-cy="page-heading"]').should("be.visible").contains('Upcoming for you')
        cy.wait(1000)

        //Visit teams page
        cy.contains('Teams').click()
        cy.contains('Teams').should('have.css', 'color', 'rgb(27, 143, 92)')

        //Verify the page header
        cy.get('div[id="team-list-page"]').within(() => {
            cy.contains('Favourite Teams').should('be.visible')
        })
        cy.get('div[id="team-list-page"]').within(() => {
            cy.contains('Receive notifications of your favourite team(s) activities').should('be.visible')
        })

        //Search for a team name Manchester City
        cy.get('div[data-cy="search-input"]').should("be.visible").type('Manchester City')
        cy.contains('Manchester City').should('be.visible')


        //Mark Manchester City team as a favourite
        cy.get('div[data-cy="team-list"]').within(() => {
            cy.contains('Manchester City').parent().parent().parent().within(() => {
                cy.get('button[aria-label="favorite"]').click()
            })
        })
        cy.get('[data-testid="StarIcon"]').should("be.visible")
    })

    it('should open Manchester City team', () => {
        cy.get('div[id="team-list-page"]').within(() => {
            cy.contains('Manchester City').should('be.visible').click()
        })
    })

    it('should display modal window', () => {
        cy.get('div[id="redeem-modal-content"]').within(() => {
            cy.contains('Manchester City').should('be.visible')
        })
    })

    it('should display go back button', () => {
        cy.get('div[id="redeem-modal-content"]').within(() => {
            cy.get('[data-testid="ArrowForwardIosIcon"]').should("be.visible")
        })
    })

    it('should display Unfavourite', () => {
        cy.get('div[id="redeem-modal-content"]').within(() => {
            cy.contains('Unfavourite').should('be.visible')
        })
    })

    it('should check Loyalty Points', () => {
        cy.get('div[id="redeem-modal-content"]').within(() => {
            cy.contains('Loyalty Points').should('be.visible')
        })
    })

    it('should check Level', () => {
        cy.get('div[id="redeem-modal-content"]').within(() => {
            cy.contains('Level').should('be.visible')
        })
    })

    it('should check Participated Matches', () => {
        cy.get('div[id="redeem-modal-content"]').within(() => {
            cy.contains('Participated Matches').should('be.visible')
        })
    })

    it('should check loyalty points icon', () => {
        cy.get('div[id="redeem-modal-content"]').within(() => {
            cy.get('[data-testid="InfoOutlinedIcon"]').should("be.visible")
        })
    })

    it('should check loyalty points info', () => {
        cy.get('[data-testid="InfoOutlinedIcon"]').click()
        cy.contains('Loyalty Points').should("be.visible")
        cy.get('[data-testid="CloseIcon"]').should("be.visible")
        cy.get('[data-testid="HelpOutlineIcon"]').should("be.visible")
        cy.get('[data-testid="AddIcon"]').should("be.visible")
    })
})