// Flow test 

var frisby = require('frisby');
frisby.globalSetup({
	request:{ 
		headers: {
					'Authorization' : 'Basic dGVyZXNhLmxvcGV6LmVAZ21haWwuY29tOmNvbnRyb2wxMjM=' 
				}
	} 
			
});


//Flow 1: create,get, update and delete a user
/*
var user={
	"Email": "panda@hotmail.com",
	"Password": "control123",
	"FullName": "Panda team"
};

frisby.create('Create user')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.inspectJSON()
	.expectJSON(user)
.toss();	

var updateUserInfo ={
			"FullName":"user name  updated"
};

frisby.create('Update user information ')
	.put('https://todo.ly/api/user/0.json', updateUserInfo, {json: true})
	.expectJSON(updateUserInfo)
	.afterJSON(function(json){
		 
		frisby.create('Delete user created')
			.delete('https://todo.ly/api/projects/0.json', {}, {json: true})
			.expectJSON({
				Deleted: true
				})
		.toss();
	})
.toss();

*/
// Flow 2:Create, get item, update item and delete item

var item = {
	"Content": "new item"
	
	
};

frisby.create('Create items')
	.post('https://todo.ly/api/items.json', item, {json: true})
	.inspectJSON()
	.expectJSON(item)
	.expectJSONTypes({
		Id: Number
	})
	.afterJSON(function(json){
		var newItemId = json.Id;
		console.log('NEW ITEM ID:', newItemId);
		
		var updateItemInfo = {
			"Content":"item name updated"
		};
		
		frisby.create('Update item')
			.post('https://todo.ly/api/items/' + newItemId + '.json', updateItemInfo, {json: true})
			.expectJSON(updateItemInfo)
			.afterJSON(function(json){
			
				frisby.create('Delete Item')
					.delete('https://todo.ly/api/items/' + newItemId + '.json', {}, {json: true})
					.expectJSON({
						Deleted: true
					})
				.toss();
			})
		.toss();
		
	})
.toss();

// Flow 3:create , get project, update project and delete project

//Flow 4: create, authentication , get token and delete token
var user={
	"Email": "panda@hotmail.com",
	"Password": "control123",
	"FullName": "Panda team"
};

frisby.create('Create user')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.inspectJSON()
	.expectJSON(user)
	.afterJSON(function(json){
			
				frisby.create('Get token')
					.get('https://todo.ly/api/authentication/token.json', {}, {json: true})
					.expectJSONTypes({
						TokenString: String,
						UserEmail:String,
						ExpirationTime:String
					})
					.afterJSON (function(json){
						frisby.create('Delete token')
							.delete('https://todo.ly/api/authentication/token.json}, {json: true})
							.expectJSON({
								Deleted: true
							})
						.toss();
						
					})
					
				.toss();
			})
			
.toss();	




// Flow 5: create a project, update and delete this

var project = {
	"Content": "new projectitooo"
};

frisby.create('Create project')
	.post('https://todo.ly/api/projects.json', project, {json: true})
	.inspectJSON()
	.expectJSON(project)
	.expectJSONTypes({
		Id: Number
	})
	.afterJSON(function(json){
		var newProjectId = json.Id;
		console.log('NEW PROJECT ID:', newProjectId);
		
		var updateProjectInfo = {
			"Content": "updated"
		};
		
		frisby.create('Update project')
			.post('https://todo.ly/api/projects/' + newProjectId + '.json', updateProjectInfo, {json: true})
			.expectJSON(updateProjectInfo)
			.afterJSON(function(json){
			
				frisby.create('Delete project')
					.delete('https://todo.ly/api/projects/' + newProjectId + '.json', {}, {json: true})
					.expectJSON({
						Deleted: true
					})
				.toss();
			})
		.toss();
		
	})
.toss();
