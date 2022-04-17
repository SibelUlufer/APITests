/// <reference types ="cypress" />

import createComment from "../support/APIs/createComment"

describe('Creating user comment test cases', ()=>{
    it('User should create a comment and check if created', ()=>{
        createComment.createCommentAndCheck()
    })
    it('Should not create a comment without mandatory fields',()=>{
        createComment.checkMandatoryField()
    })
})