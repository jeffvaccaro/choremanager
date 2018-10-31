//server.js
var express = require('express');


var app = express();
	app.use('/src', express.static(__dirname + '/src'));
var cors = require('cors');
	app.use(cors());

	
const sql = require('msnodesqlv8')
const connectionString = "server=(LocalDb)\\MSSQLLocalDB;Database=Chore;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

const sql2 = require('mssql')
const config = {
	user: 'DB_95083_choremanager_user',
    password: '962PRZnt!',
    server: 's15.winhost.com', 
	database: 'DB_95083_choremanager',
    options: {
        encrypt: true
    }	
}

//Port 5000
var server = app.listen(5000,function(){
	console.log('listening at http://%s:%s',
	server.address().address, server.address().port);
});


 sql2.connect(config).then(pool => {
     return pool.request()
    .query('SELECT ChoresId, ChoresName FROM [Chores] ORDER BY ChoresId, ChoresName ASC')
 }).then(result => {
	 console.log(result)
 })

// }).then(result => {
//     console.log(result)
// }).catch(err => {
// 	// ... error checks
// 	console.log(err);
// })
 
// sql2.on('error', err => {
// 	// ... error handler
// 	console.log(err);
// })

var data = {
	"Data":""
};

try {
	var query = "SELECT ChoreId, ChoreName FROM [Chores] ORDER BY ChoreId, ChoreName ASC";
	sql.query(connectionString, query, (err, rows) => {
		data["Data"] = rows;
		console.log(rows);
	});
} catch (err) {
	// ... error checks
	//console.log(err)
}   






app.get('/getChores', function(req,res){
    var data = {
        "Data":""
    };

	try {
		var query = "SELECT ChoreId, ChoreName FROM [Chores] ORDER BY ChoreId, ChoreName ASC";
		sql.query(connectionString, query, (err, rows) => {
            data["Data"] = rows;
            res.json(data);
		});
	} catch (err) {
		// ... error checks
		//console.log(err)
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
		//console.log(err)
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
		//console.log(err)
	}    
});

app.get('/hasLogin', function(req,res){
  var data = {
			"Data":""
	};

	try 
	{
		//console.log(req.query.id);
		var query = "SELECT COUNT(1) [rowcount] FROM [FamilyAdmin] WHERE FBID = '" + req.query.id + "' ";
		sql.query(connectionString, query, (err, rows) => {
						data["Data"] = rows;
						res.json(rows);
		});
	} catch (err) {
	// ... error checks
		console.log(err)
	} 	
});

app.get('/addRegistration', function(req,res){

    // open connection
    sql.open(connectionString, function (err, conn) {
		var familyAdminIns = "INSERT INTO [FamilyAdmin] (FBID,FBEmail)VALUES('"+req.query.id+"','"+req.query.email+"')";

		var familyIns = "INSERT INTO [Family] (FamilyName,FamilyAdminId) " +
						"	VALUES('"+req.query.name+"'," +
						"			(SELECT [FamilyAdminId] " + 
						"			FROM [FamilyAdmin]  " +
						"			WHERE FBID ='" + req.query.id + "'" +
						"			AND FBEmail = '" + req.query.email + "'))";
		console.log(familyIns);
		
		sql.query(connectionString, familyAdminIns, (err, rows) => {
			console.log(err);
			sql.query(connectionString, familyIns, (err, rows) => {
				console.log(err);
			});					
		});		
		

    });
});

app.get('/addRegistration2', function(req,res){
  var data = {
			"Data":""
	};

	try 
	{
		var query = "INSERT INTO [FamilyAdmin] (FBID,FBEmail)VALUES('"+FBID+"','"+FBEmail+"')";
		sql.query(connectionString, query, (err, rows) => {
						data["Data"] = rows;
						res.json(data);
		});

		var query = "INSERT INTO [Family] (FamilyName,FamilyAdminId)VALUES('"+NAME+"','"+AdminID+"')";
		sql.query(connectionString, query, (err, rows) => {
						data["Data"] = rows;
						res.json(data);
		});

		// var query = "INSERT INTO [Member] (FamilyId,MemberName, isAdmin)VALUES('"+FamilyID+"','"+NAME+"','" + true + "')";
		// sql.query(connectionString, query, (err, rows) => {
		// 				data["Data"] = rows;
		// 				res.json(data);
		// });


	} catch (err) {
	// ... error checks
	//console.log(err)
	} 	
});

app.get('/getsLogin', function(req,res){
  var data = {
			"Data":""
	};

	try 
	{
		var query = "SELECT TOP 1 [FamilyId] FROM [FamilyEmailLogin] WHERE AdminEmailAddress LIKE '%jeff.vaccaro@live.com%'";
		sql.query(connectionString, query, (err, rows) => {
						data["Data"] = rows;
						res.json(data);
		});
	} catch (err) {
	// ... error checks
	//console.log(err)
	} 	
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