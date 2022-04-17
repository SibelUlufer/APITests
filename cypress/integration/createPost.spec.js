/// <reference types ="cypress" />

import createPost from "../support/APIs/createPost"

describe('Creating user post test cases', ()=>{
    it('User should create a post and checks if created', ()=>{
        createPost.createPostAndCheck()
    })
    it('Should not create a post without mandatory fields', ()=>{
        createPost.checkMandatoryField()
    })
    
})