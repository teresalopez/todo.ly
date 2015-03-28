// CRUD test

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic dGVyZXNhLmxvcGV6LmVAZ21haWwuY29tOkN1ZW50YTEyMyo='
		}
		
	}
});

/*

frisby.create('Get all items of the Authenticated user')
	.get('https://todo.ly/api/items.json')
	.expectStatus(200)
	.after(function(e, r, body){
		var json = JSON.parse(body);
		expect(json.length).toBeGreaterThan(0);
	})

.toss();
*/

var item = {
	"Content": "New Item"
};

frisby.create('Create item')
	.post('https://todo.ly/api/items.json', item, {json: true})
	.inspectJSON()
	.expectJSON(item)
	.expectJSONTypes({
		Id: Number
		
	})
	.afterJSON(function(json){
		var newItemId = json.Id;
		var updateItemInfo = {
			"Content":"Item updated"
		};
		frisby.create('Update Item')
		    .put('https://todo.ly/api/items/'+newItemId + '.json', updateItemInfo, {json: true})
			.expectJSON(updateItemInfo)
			.afterJSON(function(json){
			
				frisby.create('Delete Item created')
					.delete('https://todo.ly/api/items/' + newItemId + '.json', {}, {json: true})
					.expectJSON({
						Deleted: true
					})
				.toss();
			})
		.toss();
		
	})
.toss();




