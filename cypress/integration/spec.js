import { navigationTo, formInput, RANDOM_STRING_250, RANDOM_STRING_251 } from '../helpers/utils'

const MILLISECONDS_TO_WAIT = 3000

var inputParamsForTests = [{navItem: 'home'}, {navItem: 'about'}, {navItem: 'contact'}]

describe('Navigation', () => {
    
    it('Home>About>Home>Contact', () => {
        cy.visit('/')
        navigationTo('about')
        cy.go('back')
        navigationTo('contact')
    })
})

inputParamsForTests.forEach(param => {
    var descriptionString = ''

    if(param.navItem !== 'contact'){
        descriptionString = `after loads. ${param.navItem} page contains navigation items, .${param.navItem} item and 10 .empty-content items`
    }
    else{
        descriptionString = `after loads. ${param.navItem} page contains navigation items and 10 .empty-content items`
    }

    describe(descriptionString, () => {
        beforeEach(() => {
            //cy.visit('/')
            if(param.navItem !== 'home'){
                cy.visit(`/${param.navItem}`)
            }
            else{
                cy.visit('/')
            }
        })

        if(param.navItem === 'about'){
            it(`contains This is an ${param.navItem} page`, () => {
                cy.contains(`This is an ${param.navItem} page`)
            })
        }

        if(param.navItem === 'home'){
            it(`contains This is a ${param.navItem} page`, () => {
                cy.contains(`This is a ${param.navItem} page`)
            })
        }
        
        it('contains Home', () => {
            cy.contains('Home')
        })

        it('contains About us', () => {
            cy.contains('About')
        })

        it('contains Contact us', () => {
            cy.contains('Contact')
        })

        if(param.navItem !== 'contact'){
            it(`loads 1 .${param.navItem} items`, () => {
                cy.get(`.${param.navItem}`).should('have.length', 1)
            })
        }

        it('loads 10 .empty-content items', () => {
            cy.get('.empty-content').should('have.length', 10)
        })
    })
})

describe('Check Contact Us form inputs/submit', () => {
    beforeEach(() => {
        cy.visit('/contact')
    })

    it('Error message: Name must be longer than 2 characters', () => {
        formInput('qw', '2345645677', RANDOM_STRING_250, true)
        cy.contains('Name must be longer than 2 characters')
    })

    it('Error message: Phone must be valid', () => {
        formInput('qww', '234', RANDOM_STRING_250, true)
        cy.contains('Phone must be valid')
    })

    it('Error message: Message must be less than 250 characters', () => {
        formInput('qww', '2345645677', RANDOM_STRING_251, true)
        cy.contains('Message must be less than 250 characters')
    })

    it('Submit form data', () => {
        formInput('qwww', '2345645677', RANDOM_STRING_250)
        cy.get('.v-form > :nth-child(4)').click()
        cy.wait(MILLISECONDS_TO_WAIT)
        cy.contains('Data')
    })
})