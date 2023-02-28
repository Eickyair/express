# Expressjs
Projects developed with expressjs
## Task Manager
efficiently. It is composed of a graphical interface, primarily developed using HTML and CSS, in addition to a REST API for performing CRUD operations on certain information models, in this case, the tasks that the user creates.

### CRUD
CRUD is an acronym that encompasses the four basic operations performed in a database:

- C - Create
- R - Read
- U - Update
- D - Delete

In the Task Manager, users can create, read, update, and delete their tasks using theREST AP developed with Expressjs. The **REST API** communicates the frontend with the database, which is hosted in a **cloud service** for MongoDB.
## Store Api
This API allows for more complex requests, including:
- pagination
- sorting of elements
- filters
- substring searches.

All of this with information related to products from a furniture store. The database for Store API is also hosted in a cloud service.
## Json Web Tokens
Security is a topic of great importance to me. In previous applications, although they had a certain level of security by hiding the access key to the database, it was still possible to make requests to the endpoints. However, to ensure that sensitive data is only accessible to authorized users, I implemented an authorization process using Json Web Tokens.

This authorization process restricts access to certain endpoints, and once the authorization is validated through a login, the restricted information is sent to the client. This gives greater control over who can access the information and ensures greater data protection.