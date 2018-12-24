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
	if(req.query.familyId == ""){
		var query = "SELECT ChoreId, ChoreName FROM [Chores] ORDER BY ChoreId, ChoreName ASC";
	}else{
		var query = "SELECT ChoreId, ChoreName FROM [Chores] UNION ALL SELECT CustomChoreId [ChoreId], CustomChoreName [ChoreName] FROM [CustomChores] WHERE  FamilyId = "+ req.query.familyId +" ORDER BY ChoreId, ChoreName ASC"
	}
	//console.log(query);
	const pool1 = new sql2.ConnectionPool(config, err => {
		pool1.request()
		.query(query, (err, result) => {
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
			  .query("SELECT f.FamilyId, f.FamilyName, m.MemberName, m.MemberId, CONVERT(bit,m.isAdmin) [isAdmin] FROM Family f INNER JOIN Member m ON f.familyId = m.FamilyId WHERE f.FamilyAdminId = " + req.query.id + " ", (err, result) => {
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
	  console.log("being called?");
	  try 
	  {
		  const pool7 = new sql2.ConnectionPool(config, err => {
			  // Query
			  pool7.request()
			  .query("INSERT INTO Member (FamilyId, MemberName, isAdmin)VALUES("+ req.query.familyId +",'" + req.query.memberName + "', '" + req.query.isAdmin + "') SELECT SCOPE_IDENTITY() as id", (err, result) => {
				  data["Data"] = result.recordset;
				  //console.log(data);
				  
				  res.json(data);
			  })
		  })
  
	  } catch (err) {
	  // ... error checks
		  console.log("addMember: " + err)
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



app.get('/addFamilyChore', function(req,res){
	var data = {
			  "Data":""
	  };
  
	  try 
	  {
		  const pool9 = new sql2.ConnectionPool(config, err => {
			  pool9.request()
			  .query("INSERT INTO FamilyChores(FamilyId,ChoreId,DayId,AllowanceId,isRepeatable)VALUES("+ req.query.familyId +","+ req.query.choreId + ","+ req.query.dayId + ","+ req.query.allowanceId + ",'"+req.query.isRepeatable + "') SELECT SCOPE_IDENTITY() as id", (err, result) => {
					data["Data"] = result.recordset;
					//console.log("Chore Inserted: " + data);
				  res.json(data);
			  })
		  })
  
	  } catch (err) {
	  // ... error checks
		  console.log("addChore: " + err)
	  } 	
});

app.get('/removeChore', function(req,res){
	var data = {
			  "Data":""
	  };

	  try 
	  {
		  const pool10 = new sql2.ConnectionPool(config, err => {
			  // Query
			  pool10.request()
			  .query("DELETE FamilyChores WHERE ChoreId = "+ req.query.choreId + " AND FamilyId = "+ req.query.familyId , (err, result) => {
				  data["Data"] = "True";
				  console.log("Chore Deleted: " + data);
				  
				  res.json(data);
			  })
		  })
  
	  } catch (err) {
	  // ... error checks
		  console.log("removeChore: " + err)
	  } 	
});

app.get('/addCustomChore', function(req,res){
	var data = {
			  "Data":""
	  };
  
	  try 
	  {
		  const pool11 = new sql2.ConnectionPool(config, err => {
			  // Query
			  pool11.request()
			  .query("INSERT INTO CustomChores(CustomChoreName,FamilyId,Approve)VALUES('"+ req.query.choreName +"',"+ req.query.familyId +",''", (err, result) => {
					data["Data"] = "True";
					console.log("CustomChore Inserted: " + data);
				  
				  res.json(data);
			  })
		  })
  
	  } catch (err) {
	  // ... error checks
		  console.log("addCustomChore: " + err)
		} 	
	});

	 
	// app.get('/removeCustomChore', function(req,res){
	// 	var data = {
	// 			  "Data":""
	// 	  };
	
	// 	  try 
	// 	  {
	// 		  const pool12 = new sql2.ConnectionPool(config, err => {
	// 			  // Query
	// 			  pool12.request()
	// 			  .query("DELETE CustomChores WHERE ChoreId = '"+ req.query.choreId + "' AND FamilyId = '"+ req.query.familyId , (err, result) => {
	// 				  data["Data"] = "True";
	// 				  console.log("Chore Deleted: " + data);
					  
	// 				  res.json(data);
	// 			  })
	// 		  })
	  
	// 	  } catch (err) {
	// 	  // ... error checks
	// 		  console.log("removeChore: " + err)
	// 	  } 	
	// });
	
	app.get('/getFamilyChores', function(req,res){
		var data = {
				  "Data":""
		  };
	  
		  var query = 	"SELECT CONVERT(INT,ROW_NUMBER() OVER (ORDER BY fc.FamilyChoreId)) [arrIndex], c.ChoreId [choreId], c.ChoreName [choreName], d.DayId [dayId], d.Day [dayName], CONVERT(bit,fc.isRepeatable) [isRepeat], a.AllowanceId [allowanceId], '$' + Convert(nVarchar(10),a.AllowanceValue) [allowanceValue]" +
						  "FROM FamilyChores fc " + 
						  "INNER JOIN [Chores] c ON fc.ChoreId = c.ChoreId " +
						  "INNER JOIN [Days] d ON fc.dayId = d.dayid " + 
						  "INNER JOIN [Allowance] a ON fc.allowanceId = a.AllowanceId " + 
						  "WHERE fc.familyid = "+ req.query.familyId + "ORDER BY fc.FamilyChoreId";

						//   arrIndex: vm.addChoreRowIndex,
						//   choreId: vm.choreValId,
						//   choreName: vm.choreVal,
						//   dayId: vm.frequencyValId,
						//   dayName: vm.frequencyVal,
						//   isRepeat: vm.repeatable,
						//   allowanceId: vm.allowanceValId,
						//   allowanceValue: vm.allowanceVal
		  try 
		  {
			  const pool13 = new sql2.ConnectionPool(config, err => {
				  pool13.request()
				  .query(query
				  , (err, result) => {
						data["Data"] = result.recordset;
						console.log("getFamilyChores: " + data);
					  res.json(data);
				  })
			  })
	  
		  } catch (err) {
		  // ... error checks
			  console.log("getFamilyChores: " + err)
		  } 	
	});
//Port 5000
var server = app.listen(5000,function(){
	console.log('listening at http://%s:%s',
	server.address().address, server.address().port);
});
