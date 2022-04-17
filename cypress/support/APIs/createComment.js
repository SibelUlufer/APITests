import commonAPIS from "./commonAPIs";

class createComment extends commonAPIS{
    //creates user post and commet, then checks if created
    static createCommentAndCheck(){
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
            cy.wrap(response.body.data.id).as('userId')
            const userId = response.body.data.id 

            cy.request({
                headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                url:'https://gorest.co.in/public/v1/users/'+ userId + '/posts',
                method: 'POST',
                body: {
                    "title": "This is test for posting a post",
                    "body": "Lorem ipsum"}
            }).then(response=>{//user post created
                expect(response.status).to.eq(201)
                cy.wrap(response.body.data.id).as('postId')
                const postId = response.body.data.id

                cy.request({
                    headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                    url:'https://gorest.co.in/public/v1/posts/'+ postId + '/comments',
                    method: 'POST',
                    body: { 
                        "name": Cypress.env('fullName'),
                        "email":Cypress.env('email'),
                        "body": "test for create a comment" }
                }).then(response=>{//user comment created for the post
                    expect(response.status).to.eq(201)  
                    cy.wrap(response.body.data.id).as('commentId')
                    const commentId = response.body.data.id

                    cy.request({
                        headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                        url:'https://gorest.co.in/public/v1/posts/'+ postId + '/comments',
                        method: 'GET', 
                    }).then(response=>{//user comment checked for the post if created
                        expect(response.status).to.eq(200)
                        expect(response.body.data[0]).has.property('id', commentId)
                        expect(response.body.data[0]).has.property('post_id', postId)
                    })
                })
            })
        })
    }
    //checks comment creation without mandatory field
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
            cy.wrap(response.body.data.id).as('userId')
            const userId = response.body.data.id 

            cy.request({
                headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                url:'https://gorest.co.in/public/v1/users/'+ userId + '/posts',
                method: 'POST',
                body: {
                    "title": "This is test for posting a post",
                    "body": "Lorem ipsum"}
            }).then(response=>{//user post created
                expect(response.status).to.eq(201)
                cy.wrap(response.body.data.id).as('postId')
                const postId = response.body.data.id

                cy.request({
                    headers:{ Authorization: 'Bearer ' + Cypress.env('accessToken')},
                    url:'https://gorest.co.in/public/v1/posts/'+ postId + '/comments',
                    method: 'POST',
                    failOnStatusCode: false,
                    body: { 
                        "name": Cypress.env('fullName'),
                        "body": "test for create a comment" }
                }).then(response=>{//user comment is not created for the post 
                    expect(response.status).to.eq(422) 
                    expect(response.body.data[0]).has.property('field', 'email')
                    expect(response.body.data[0]).has.property("message", "can't be blank")
                   
                })
            })
        })
    }
}
export default createComment