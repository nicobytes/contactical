var express = require('express');
var app = express();

var contacts = [
	{
		name: 'Nicolas'
	},
	{
		name: 'Carlos'
	}
];

app.get('/contacts', function(req, res){
	res.status(200).json( contacts );
});

app.listen(9001);