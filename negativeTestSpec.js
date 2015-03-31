// negative test

var frisby = require('frisby');

frisby.globalSetup({
	request:{ 
			headers: {
				'Authorization' : 'Basic dGVyZXNhLmxvcGV6LmVAZ21haWwuY29tOkN1ZW50YTEyMyo=' 
			},
	} 
});

/*
* Create a project without name
*
**/
var project = {
	"Content": ""
};
 
frisby.create('Given  a user authenticated try to create a project without name')
	.post('https://todo.ly/api/projects.json', project, {json: true})
	.expectStatus(200)
	.expectJSON('', {
		ErrorMessage: "Too Short Project Name",
		ErrorCode: 305
	})
.toss();

/*
*  try to create an item without name
*/

var item = {
	"Content": ""
};

frisby.create('Given  a user authenticated try to create a item without name')
	.post('https://todo.ly/api/items.json', item, {json: true})
	.expectStatus(200)
	.expectJSON('', {
		ErrorMessage: "Too Short Item Name",
		ErrorCode: 308
	})
.toss();


//Create User with a password too short
var user = {
	"Email": "t.r@test.com",
	"FullName": "Super test",
	"Password": ""
};

frisby.create('Given a user authenticated try to create a user without password')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.expectStatus(200)
	.expectJSON('', {
		ErrorMessage: "Password too short",
		ErrorCode: 202
	})
.toss();

/*
* Create a user account with email already registered
*
*/

var userDuplicated = {
	"Email": "teresa.lopez.e@gmail.com",
	"FullName": "teresa lopez",
	"Password": "control123"
};


frisby.create('Given a user authenticated try to create a user with password already registered')
	.post('https://todo.ly/api/user.json', userDuplicated, {json: true})
	.expectStatus(200)
	.expectJSON('', {
		ErrorMessage: "Account with this email address already exists",
		ErrorCode: 201
	})
.toss();

/*
* Try to create a user with invalid full name
*
*/

var userInvalid = {
	"Email": "t.e@gmail.com",
	"FullName": "",
	"Password": "control123"
};

frisby.create('Given a user authenticated try to create a user without full name')
	.post('https://todo.ly/api/user.json', userInvalid, {json: true})
	.expectStatus(200)
	.expectJSON('', {
		ErrorMessage: "Invalid FullName",
		ErrorCode: 306
	})
.toss();
