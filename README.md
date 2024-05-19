# Assignment for Vahan SDE Internship

Project for the problem statement:

"Create a very rudimenatary headless CMS with extremely basic CRUD functionality. You can imagine this to be an extremely basic version of strapi.js. As an end user, when I run your project, I should be able to create different entities from the frontend by specifying its attributes and their types. (Eg. Person is an entity with attributes name<string>, email<string>, mobileNumber<number>, dateOfBirth<Date>). When an entity is created from frontend, the app should automatically create a table definition, depending on the attributes in an RDMBS (mysql or postgresql only). After creating an entity, I should be able to Create, Read, Update and Delete data in that entity from the frontend itself. (Eg. I should be able to create an entry in the Person entity using name as Ketan, ketan@test.com as the email, 9876543210 as the mobile number and 1-Jan-1990 as the date of birth. I should be able to add, update existing entry, view created entries and delete an existing entries.)"

1. Used MySQL, NodeJS and ExpressJS for backend and ReactJS for frontend.
2. CRUD functionalities to view/create/delete tables and view/create/update/delete entries in table.
3. User clicks buttons and request is sent via axios.
4. GET, POST, PUT and DELETE methods to create SQL queries and required data is sent back to frontend handle functions.
5. Data is stored on local machine (workbench).
