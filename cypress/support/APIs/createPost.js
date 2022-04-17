import commonAPIS from "./commonAPIs";

class createPost extends commonAPIS{
    //creates user and post then checks if created by the user
    static createPostAndCheck(){
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
        }).then(response=>{//user created
            expect(response.status).to.eq(201)
            cy.wrap(response.body.data.id).as('userId')
            const userId = response.body.data.id

            cy.request({
                url:'https://gorest.co.in/public/v1/users/'+ userId + '/posts',
                method: 'POST',
                headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                body: {
                    "title": "This is test for posting a post",
                    "body": "Lorem ipsum"}
            }).then(response=>{//post created by the user
                expect(response.status).to.eq(201) 
                cy.wrap(response.body.data.id).as('postId')
                const postId = response.body.data.id

                cy.request({
                    url:'https://gorest.co.in/public/v1/users/'+ userId + '/posts',
                    method: 'GET',
                    headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                }).then(response=>{//checks the post if created by the user
                    expect(response.status).to.eq(200) 
                    expect(response.body.data[0]).has.property('id', postId)
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
            url:'https://gorest.co.in/public/v1/users',
            method: 'POST',
            headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
            body: { 
                name: Cypress.env('fullName'),
                email: Cypress.env('email'),
                gender: "female",
                status: "active"  }
        }).then(response=>{//user created
            const userId = response.body.data.id

            cy.request({
                url:'https://gorest.co.in/public/v1/users/'+ userId + '/posts',
                method: 'POST',
                headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                failOnStatusCode: false,
                body: {"title": "This is test for posting a post"}//body field not sent in body
            }).then(response=>{//checks validation message
                expect(response.status).to.eq(422) 
                expect(response.body.data[0]).has.property('field', 'body')
                expect(response.body.data[0]).has.property("message", "can't be blank")
            })
        })
    }
}
export default createPost