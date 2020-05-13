const connection = require('./connection')
const {ObjectID} = require('mongodb')
connection.connectDb(async (err)=>{
    if (err) throw err
    else{
       const db = connection.getDb()
       const id = "5e89a24430b8b32f206bc097"
       db.collection("doctors").find({"working_locations.place":ObjectID(id)}).toArray((err,result)=>{
           if(err) throw err
           else if(result===null){
               console.log("retry");
               
           }
           else{
               console.log(result);
               
           }
           
       })
    }
})
