const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies 


var users = [{id:1,firstName:"John1", lastName:"Doe", age:46},
			 {id:2,firstName:"John2", lastName:"Doe", age:46},
			 {id:3,firstName:"John3", lastName:"Doe", age:46},
		     {id:4,firstName:"John4", lastName:"Doe", age:46},
		     {id:5,firstName:"John5", lastName:"Doe", age:46}];

app.get('/', (req, res) => res.send('welcome to express api sample'));

// GET request will get all the user data
app.get('/api/users',function(req,res){
	res.json(users); 	
});


// POST http://localhost:3000/api/adduser
// post parameters
app.post('/api/adduser', function(req, res) {
	console.log(req.body);
	var id = users.length + 1;
	var user = {id:id,firstName:req.body.firstName, lastName:req.body.lastName, age:req.body.age};
	users.push(user);
    res.json({code:1,status:'success',message:"User Added"}); 
});
// DELETE http://localhost:3000/api/deleteuser/1
//url parameter
app.delete('/api/deleteuser/:id', function(req, res) { 
	var user_found = false;
	for (var i = users.length - 1; i >= 0; i--) {
		console.log(i);
		if(users[i].id == req.params.id){
			user_found = true;
			users.splice(i,1);
			console.log("user found and deleted");
			res.json({code:1,status:'success',message:"User Deleted"});
			return;
		}
		console.log("after if");

		if( i == 0 & user_found != true){
			res.json({code:0,status:'fail',message:"User not found"});		
		}
	}
});

// UPDATE http://localhost:3000/api/updateuser
// post parameters
app.patch('/api/updateuser',function(req,res){
	var user_found = false;
	for (var i = users.length - 1; i >= 0; i--) {
		if(users[i].id == req.body.id){
			user_found = true;
			users[i] = {id:req.body.id,firstName:req.body.firstName, lastName:req.body.lastName, age:req.body.age};
			res.json({code:1,status:'success',message:"User updated"});
			return;
		}

		if( i == 0 & user_found != true){
			res.json({code:0,status:'fail',message:"User not found"});		
		}

	}

});


app.listen(3000, () => console.log('Example app listening on port 3000'));