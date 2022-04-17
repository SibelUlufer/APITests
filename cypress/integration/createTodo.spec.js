/// <reference types ="cypress" />

import createTodo from "../support/APIs/createTodo"

describe('Creating todo test cases', ()=>{
    it('User should create todo and checks if created', ()=>{
        createTodo.createTodoAndCheck()
    })
    it('Should not create a todo without mandatory fields', ()=>{
        createTodo.checkMandatoryField()
    })
})