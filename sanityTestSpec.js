// Sanity test

var frisby = require('frisby');

frisby.globalSetup({
	request:{ 
			headers: {
				'Authorization' : 'Basic dGVyZXNhLmxvcGV6LmVAZ21haWwuY29tOmNvbnRyb2wxMjM=' 
			},
	} 
});

/*
* Create a user 
*
**/
var user = {
	"Email": "andy.panda@gmail.com",
	"Password": "panda",
	"FullName": "Andy"
};

frisby.create('Given  Create a new user')
	.post('https://todo.ly/api/user.json', user, {json: true})
	.inspectJSON()
	.expectJSON(user)
	.expectJSONTypes({
		Id: Number
		
	})
	afterJSON(function(json){
		var newUserId = json.Id;
		var updateUserInfo = {
			"Password":"pandita"
		};
		frisby.create('Update User password')
		    .put('https://todo.ly/api/user/'+newUserId + '.json', updateUserInfo, {json: true})
			.expectJSON(updateUserInfo)
			.afterJSON(function(json){
			
				frisby.create('Delete user created')
					.delete('https://todo.ly/api/user/' + newUserId + '.json', {}, {json: true})
					.expectJSON({
						Deleted: true
					})
				.toss();
			})
		.toss();
		
	})
.toss();

// create item in Next category

var item = {
	"Content": "New task in Next category",
	"Checked": "true",
	"dateString": "Tomorrow 10:00 AM"
};

frisby.create('Given  Create a new item')
	.post('https://todo.ly/api/items.json', item, {json: true})
	.inspectJSON()
	.expectJSON(item)
	.expectJSONTypes({
		Id: Number
		
	})
	afterJSON(function(json){
		var newItemId = json.Id;
		var updateItemInfo = {
			"Checked":"false"
		};
		frisby.create('Update Item')
		    .put('https://todo.ly/api/items/'+newItemId + '.json', updateItemInfo, {json: true})
			.expectJSON(updateItemInfo)
			.afterJSON(function(json){
			
				frisby.create('Delete item created')
					.delete('https://todo.ly/api/item/' + newItemId + '.json', {}, {json: true})
					.expectJSON({
						Deleted: true
					})
				.toss();
			})
		.toss();
		
	})
.toss();

