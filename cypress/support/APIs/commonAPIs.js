class commonAPIS{
        //sets random name and keeps it to use it later on for API
        static setName(){
            let randomName = ''
            let testFirstName =''
            let testLastName = ''
            let pattern = 'abcdefghiklmnopqrstuyvwxyz'
            for(let i=0; i<6; i++)
            testFirstName+=pattern.charAt(Math.floor(Math.random() * pattern.length)) 
            for(let i=0; i<6; i++)
            testLastName+=pattern.charAt(Math.floor(Math.random() * pattern.length)) 
            randomName = testFirstName + " " +testLastName
            Cypress.env('fullName', randomName)
        }
        //sets random email and keeps it to use it later on for API
        static setEmail(){
            let randomText = ''
            let testText =''
            let pattern = 'abcdefghiklmnopqrstuyvwxyz'
            for(let i=0; i<10; i++)
            randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length)) 
            testText = randomText + '@example.com'
            Cypress.env('email', testText)
        }
        //converts the email address to invalid email address
        static setInvalidEmail(){
            this.setEmail()
            let mail 
            mail = Cypress.env('email').replace('@', '')
            Cypress.env('invalidEmail', mail)
        }
}
export default commonAPIS