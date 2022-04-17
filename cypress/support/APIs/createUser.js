import commonAPIS from "./commonAPIs"

class createUser extends commonAPIS{
    //creates user and checks if created
    static createUserAndCheck(){
        this.setEmail()
        this.setName()
        cy.request({
            method: 'POST',
            url:'https://gorest.co.in/public/v1/users',
            headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
            body: { 
                name: Cypress.env('fullName'),
                email: Cypress.env('email'),
                gender: "female",
                status: "active"  }
        }).then( response=>{//user created
            expect(response.status).to.eq(201)
            expect(response.body.data).has.property('email', Cypress.env('email'))
            expect(response.body.data).has.property('name', Cypress.env('fullName'))
            expect(response.body.data).has.property('gender', 'female')
            cy.wrap(response.body.data.id).as('userId')
            const userId = response.body.data.id
           
            cy.request({
                headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                url:'https://gorest.co.in/public/v1/users/'+ userId,
                method: 'GET'
            }).then( response=>{//checks if user created
                expect(response.status).to.eq(200) 
                expect(response.body.data).has.property('id', userId)
                const userID = response.body.data.id
                Cypress.env('userID', userID)
                cy.wrap(userID).as('userID')
            })
        })
    }
    //checks if email is not exist
    static checkMandatoryField(){
        this.setName()
        cy.request({
            url: 'https://gorest.co.in/public/v1/users',
            method: 'POST',
            failOnStatusCode: false,
            headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
            body: { //email not sent in body
                name: Cypress.env('fullName'),
                gender: "female",
                status: "active"  }
        }).then( response =>{//checks validation message
            expect(response.status).to.eq(422) 
            expect(response.body.data[0]).has.property('field', 'email')
            expect(response.body.data[0]).has.property("message", "can't be blank")
        })
    }
    //checks the email address if already exist
    static isEmailExist(){
        this.checkMandatoryField()
        cy.request({
            url: 'https://gorest.co.in/public/v1/users',
            method: 'POST',
            failOnStatusCode: false,
            headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
            body: { //sent already exist email in body
                name: Cypress.env('fullName'),
                email:  Cypress.env('email'),
                gender: "female",
                status: "active"  }
        }).then(response =>{//checks validation message
            expect(response.status).to.eq(422) 
            expect(response.body.data[0]).has.property('field', 'email')
            expect(response.body.data[0]).has.property("message", "has already been taken") 
        })
    }
    //checks the mail address if invalid
    static isEmailInvalid(){
        this.setName()
        this.setInvalidEmail()
        cy.request({
            url: 'https://gorest.co.in/public/v1/users',
            method: 'POST',
            failOnStatusCode: false,
            headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
            body: { //invalid email is sent in body
                name: Cypress.env('fullName'),
                email:  Cypress.env('invalidEmail'),
                gender: "female",
                status: "active"  }
        }).then(response =>{//checks validation message
            expect(response.status).to.eq(422) 
            expect(response.body.data[0]).has.property('field', 'email')
            expect(response.body.data[0]).has.property("message", "is invalid")
        })
    }
}
export default createUser