## Getting started
- Install dependencies with npm
```
  npm init
```
- Run the project
```
"npm run cy:open" or "npx cypress open"
```

## CYPRESS DASHBOARD 
- Dashboard integration with
```
"npm run cy:run"
```
## GitHub 
- Integration Cypress runs into GitHub actions with
```
"npm run cy:run-dashboard"
```

## Selected REST API
```
https://gorest.co.in/
```

**../integrations file has 4 spec files.**
**../integrations/createComment.spec.js includes comment creation tests which consist of 2 cases**
**../integrations/createPost.spec.js includes post creation tests which consist of 2 cases.**
**../integrations/createTodo.spec.js includes todo creation tests which consist of 2 cases.**
**../integrations/createUser.spec.js includes user creation tests which consist of 4 cases.**

**../support/APIs has 5 .js files**
**../support/APIs/commonAPIs.js includes common fuctions for all api testing.**
**../support/APIs/createComment.js includes creating comment tests' functions.**
**../support/APIs/createPost.js includes creating post tests' functions.**
**../support/APIs/createTodo.js includes creating todo tests' functions.**
**../support/APIs/createUser.js includes creating user tests' functions.**


**.prettierrc file has format settings.**