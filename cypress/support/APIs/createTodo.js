import commonAPIS from "./commonAPIs";

class createTodo extends commonAPIS{
    //creates user and todo, then checks if created by the user
    static createTodoAndCheck(){
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
        }).then(response=>{//created user
            cy.wrap(response.body.data.id).as('userId')
            const userId = response.body.data.id

            cy.request({
                headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                url:'https://gorest.co.in/public/v1/users/'+ userId + '/todos',
                method: 'POST',
                body: {
                    "title": "Test todo",
                    "status": "pending",
                    "due_on": "2022-18-04"}
            }).then(response=>{//user created a todo
                expect(response.status).to.eq(201) 
                cy.wrap(response.body.data.id).as('todoId')
                const todoId = response.body.data.id

                cy.request({
                    headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                    url:'https://gorest.co.in/public/v1/users/'+ userId + '/todos',
                    method: 'GET'
                }).then(response=>{//checked the todo if created by the user
                    expect(response.status).to.eq(200) 
                    expect(response.body.data[0]).has.property('id', todoId)
                    expect(response.body.data[0]).has.property('user_id', userId)
                })
            })
        })
    }
    //checks post creation without mandatory field
    static checkMandatoryField(){
        this.setName()
        this.setEmail()
        cy.request({
            method: 'POST',
            url:'https://gorest.co.in/public/v1/users',
            headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
            body: { 
                name: Cypress.env('fullName'),
                email: Cypress.env('email'),
                gender: "female",
                status: "active"  }
        }).then(response=>{//user created
            cy.wrap(response.body.data.id).as('userId')
            const userId = response.body.data.id 

            cy.request({
                headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                url:'https://gorest.co.in/public/v1/users/'+ userId + '/todos',
                method: 'POST',
                failOnStatusCode: false,
                body: { "title": "Test todo"}//status not sent in body
            }).then(response=>{//checks validation message 
                expect(response.status).to.eq(422) 
                expect(response.body.data[0]).has.property('field', 'status')
                expect(response.body.data[0]).has.property("message", "can't be blank")
            })
        })
    }
}
export default createTodo