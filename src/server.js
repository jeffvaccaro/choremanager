//server.js
var express = require('express');


var app = express();
	app.use('/src', express.static(__dirname + '/src'));
var cors = require('cors');
	app.use(cors());

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



app.get('/getChores', function(req,res){
    var data = {
        "Data":""
    };

	const pool1 = new sql2.ConnectionPool(config, err => {
		// Query
		pool1.request() // or: new sql.Request(pool1)
		.query("SELECT ChoreId, ChoreName FROM [Chores] ORDER BY ChoreId, ChoreName ASC", (err, result) => {
			// ... error checks
			data["Data"] = result.recordset;
			res.json(data);
		})
	 
	})
});

app.get('/getAllowance', function(req,res){
    var data = {
        "Data":""
    };

	const pool2 = new sql2.ConnectionPool(config, err => {
		// Query
		pool2.request() // or: new sql.Request(pool1)
		.query("SELECT AllowanceId, '$' + Convert(nVarchar(10),AllowanceValue) [AllowanceValue] FROM [Allowance]", (err, result) => {
			// ... error checks
			data["Data"] = result.recordset;
			res.json(data);
		})
	 
	})
});

app.get('/getDays', function(req,res){
    var data = {
        "Data":""
    };

	const pool3 = new sql2.ConnectionPool(config, err => {
		// Query
		pool3.request() // or: new sql.Request(pool1)
		.query("SELECT [DayId] ,[Day] FROM [Days]", (err, result) => {
			// ... error checks
			data["Data"] = result.recordset;
			res.json(data);
		})
	})	
});

app.get('/hasLogin', function(req,res){
  var data = {
			"Data":""
	};

	try 
	{
		console.log(req.query.id);
		const pool4 = new sql2.ConnectionPool(config, err => {
			// Query
			pool4.request() // or: new sql.Request(pool1)

			.query("SELECT ISNULL((SELECT familyAdminId FROM FamilyAdmin WHERE FBID = '" + req.query.id + "'), -999) [familyAdminId] ", (err, result) => {
				data["Data"] = result.recordset[0]["familyAdminId"];
				res.json(data);
			})
		})

	} catch (err) {
		console.log("hasLogin: " + err)
	} 	
});

app.get('/addRegistration', function(req,res){
	var data = {
		"Data":""
	};
	try 
	{
		const pool5 = new sql2.ConnectionPool(config, err => 
			{
				// Stored Procedure
				pool5.request()
				.input('FBID', sql2.VarChar(250), req.query.id)
				.input('FBEmail', sql2.VarChar(250), req.query.email)
				.input('FBName', sql2.VarChar(250), req.query.memberName)
				.input('FamilyName', sql2.VarChar(250), req.query.familyName)
				.execute('sp_registerUser', (err, result) => 
				{
					data["Data"] = result.recordset[0];
					// console.log(result.recordset);	
					// console.log(result.recordset[0]);	
					// console.log(data);	
					res.json(data);
				})
			})
		 pool5.on('error', err => {
		 	console.log("Error");
		 })
	} catch (err) {
		console.log("addRegistration: " + err)
	} 		
});

app.get('/getFamily', function(req,res){
	var data = {
			  "Data":""
	  };
  
	  try 
	  {
		  const pool6 = new sql2.ConnectionPool(config, err => {
			  // Query
			  pool6.request() // or: new sql.Request(pool1)
			  .query("SELECT f.FamilyId, f.FamilyName, m.MemberName, m.MemberId, m.isAdmin FROM Family f INNER JOIN Member m ON f.familyId = m.FamilyId WHERE f.FamilyAdminId = '" + req.query.id + "' ", (err, result) => {
				  data["Data"] = result.recordset;
				  //console.log(data);
				  res.json(data);
			  })
		  })
  
	  } catch (err) {
	  // ... error checks
		  console.log("hasLogin: " + err)
	  } 	
});

app.get('/addMember', function(req,res){
	var data = {
			  "Data":""
	  };
  
	  try 
	  {
		  const pool7 = new sql2.ConnectionPool(config, err => {
			  // Query
			  pool7.request()
			  .query("INSERT INTO Member (FamilyId, MemberName, isAdmin)VALUES("+ req.query.familyId +",'" + req.query.memberName + "', '" + req.query.isAdmin + "') SELECT SCOPE_IDENTITY() as id", (err, result) => {
				  data["Data"] = result.recordset;
				  console.log(data);
				  
				  res.json(data);
			  })
		  })
  
	  } catch (err) {
	  // ... error checks
		  console.log("hasLogin: " + err)
	  } 	
});

app.get('/updateMember', function(req,res){
	var data = {
			  "Data":""
	  };

	  try 
	  {
		  const pool8 = new sql2.ConnectionPool(config, err => {
			  // Query
			  pool8.request()
			  .query("UPDATE Member SET MemberName = '" + req.query.memberName + "', isAdmin = '" + req.query.isAdmin + "' WHERE MemberId = " + req.query.memberId, (err, result) => {
				  data["Data"] = "True";
				  console.log(data);
				  
				  res.json(data);
			  })
		  })
  
	  } catch (err) {
	  // ... error checks
		  console.log("hasLogin: " + err)
	  } 	
});

//Port 5000
var server = app.listen(5000,function(){
	console.log('listening at http://%s:%s',
	server.address().address, server.address().port);
});
