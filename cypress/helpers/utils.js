String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export const RANDOM_STRING_250 = 'EZLA69bKOF1D0Yini9qOco08moleD7mLQ2dxZuHqailcF2JLpYUWnsvnsXTz1AWBNg6lxkYmBJHSsrFVHy62QvzShP5LTQ00oT8bdZ5DBm3mwl1iVrQrXrbrNuoxpwg8j6KrDGScVk6UO4iHDN62g7LvTBWrPHx2uXf3CY0UYqN9cLdgINHZcp5BOQfGmCaOZjS0568h2kmDD4WGLvHYCmpFcS6jbgngnuaGuh3jfJPasE5BifGVvj8Ve5'
export const RANDOM_STRING_251 = 'EZLA69bKOF1D0Yini9qOco08moleD7mLQ2dxZuHqailcF2JLpYUWnsvnsXTz1AWBNg6lxkYmBJHSsrFVHy62QvzShP5LTQ00oT8bdZ5DBm3mwl1iVrQrXrbrNuoxpwg8j6KrDGScVk6UO4iHDN62g7LvTBWrPHx2uXf3CY0UYqN9cLdgINHZcp5BOQfGmCaOZjS0568h2kmDD4WGLvHYCmpFcS6jbgngnuaGuh3jfJPasE5BifGVvj8Ve5a'

export const navigationTo = (navItem) => {
    cy.contains('.v-btn__content', navItem.capitalize()).click()
    cy.url().should('contain', '/' + navItem)
}

export const formInput = (name, phone, message, withError=false) => {
    cy.get(':nth-child(1) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type(name)
    cy.get(':nth-child(2) > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type(phone)
    cy.get('textarea')
        .type(message)
    if(withError){
        cy.get('.v-form > :nth-child(4)').should('be.disabled')
    }
}