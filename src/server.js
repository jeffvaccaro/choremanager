//server.js
var express = require('express');
const sql = require('msnodesqlv8')

var app = express();
app.use('/src', express.static(__dirname + '/src'));
var cors = require('cors');
app.use(cors());

const config = {
	server: "localhost",
	database: "Chore"
};
const connectionString = "server=(LocalDb)\\MSSQLLocalDB;Database=Chore;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

//Index Route
// app.get('/',function(req,res){
//     //updateEmails();
//     //getUsers();
//     //console.log(__dirname);
//     res.sendFile('index.html', {root: __dirname});
// });

// //Index Route
// app.get('/index',function(req,res){
//     res.sendFile('index.html', {root: __dirname});
// });

app.get('/getChores', function(req,res){
    var data = {
        "Data":""
    };

	try {
		var query = "SELECT ChoreId, ChoreName FROM [Chores] ORDER BY ChoreName ASC";
		sql.query(connectionString, query, (err, rows) => {
            data["Data"] = rows;
            res.json(data);
		});
	} catch (err) {
		// ... error checks
		console.log(err)
	}    
});

app.get('/getAllowance', function(req,res){
    var data = {
        "Data":""
    };

	try {
		var query = "SELECT AllowanceId, '$' + Convert(nVarchar(10),AllowanceValue) [AllowanceValue] FROM [Allowance]";
		sql.query(connectionString, query, (err, rows) => {
            data["Data"] = rows;
            res.json(data);
		});
	} catch (err) {
		// ... error checks
		console.log(err)
	}    
});

app.get('/getDays', function(req,res){
    var data = {
        "Data":""
    };

	try {
		var query = "SELECT [DayId] ,[Day] FROM [Chore].[dbo].[Days]";
		sql.query(connectionString, query, (err, rows) => {
            data["Data"] = rows;
            res.json(data);
		});
	} catch (err) {
		// ... error checks
		console.dir(err)
	}    
});

//Port 5000
app.listen(5000,function(){
	console.log('Listening on port 5000');
});

// function getUsers(){
// 	try {
// 		var query = "SELECT * FROM [USER]";
// 		sql.query(connectionString, query, (err, rows) => {
//             return rows;
//             //console.log(rows);
// 		});
// 	} catch (err) {
// 		// ... error checks
// 		console.dir(err)
// 	}
// }

// function updateEmails(){
// 	var query = "UPDATE [User] SET EMAIL = replace(EMAIL,'arapahoegov.com','accrediation.net')  WHERE email like '%@arapahoegov.com%'";
//     // open connection
//     sql.open(connectionString, function (err, conn) {
//         //assert.ifError(err);
//         // prepare a statement which can be re-used
//         conn.prepare(query, function (e, ps) {
//             // called back with a prepared statement
//             console.log(ps.getMeta());
//             // prepared query meta data avaialble to view
//             //assert.ifError(err);
//             // execute with expected paramater
//             ps.preparedQuery([1], function(err, fetched) {
//                 console.log(fetched);
//                 // can call again with new parameters.
//                 // note - free the statement when no longer used,
//                 // else resources will be leaked.
//                 ps.free(function() {
//                     //done();
//                 })
//             });
//         });
//     });	
// }