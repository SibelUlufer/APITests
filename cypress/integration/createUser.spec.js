/// <reference types ="cypress" />

import createUser from "../support/APIs/createUser"

describe('Creating user test cases', ()=>{
    it('Should create a user and check if created', ()=>{
        createUser.createUserAndCheck()
    })
    it('Should not create a user without email', ()=>{
        createUser.checkMandatoryField()
    })
    it('Should not create a user with the same email address', ()=>{
        createUser.isEmailExist()
    })
    it('Should not create user with an invalid email address', ()=>{
        createUser.isEmailInvalid()
    })
})