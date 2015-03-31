// CRUD test cases

var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic dGVyZXNhLmxvcGV6LmVAZ21haWwuY29tOmNvbnRyb2wxMjM='
		}
		
	}
});

var item = {
	"Content": "New "
	};
	
var urlCreate ='https://todo.ly/api/items.json';

//  Function to create an item,project or User.
frisby.create('Given an user is authentificated to create a item ')
	.post(urlCreate,item, {json: true})
	.expectJSON(item)
	.expectJSONTypes({
		Id: Number
	})
.toss();

// Function to get  all projects or items

var urlGet= 'https://todo.ly/api/projects.json';

frisby.create('Get all projects')
	.get(urlGet)
	.expectStatus(200)
	.after(function(e, r, body){
		var json = JSON.parse(body);
		console.log(json);
		expect(json.length).toBeGreaterThan(0);
	})
	
.toss();

// Function to get  a projects, item or user

var urlGet= 'https://todo.ly/api/projects/3419690.json';

frisby.create('Get a project  by ID')
	.get(urlGet)
	.expectStatus(200)
	.expectJSONTypes({
		Id: Number
	})
	
.toss();


// Function to update project or item

var itemUpdate = {
	"Content": "Name update"
};

var urlUpdate ='https://todo.ly/api/items/8842646.json';

frisby.create('Given an user is authentificated to update item information')
	.post(urlUpdate,itemUpdate, {json: true})	
	.expectJSON(itemUpdate)
	.expectJSONTypes({
		Id: Number,
		Content:String
	})
.toss();

// Function to delete a project or item

var project = {
	"Content": " Project deleted"
};
var urlDelete = 'https://todo.ly/api/projects.json';
 frisby.create('Given an account use API request to delete a Project')
	.post(urlDelete, project, {json: true})
	.inspectJSON()
	.expectJSON(project)
	.afterJSON(function(responseData){		
		frisby.create('Delete project with ID:' + responseData.Id)
			.delete('https://todo.ly/api/projects/' + responseData.Id + '.json')
			.expectJSON({
				Deleted: true
			})				
		.toss();
	})
.toss();












































/*


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


*/

