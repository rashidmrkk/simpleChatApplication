const connection = require('../mongoDb/connection')
const {getUsers}=require('../handlers/getUsers')
exports.updateUserStatus = (socketId,user,connectionType,socket)=>{

    if(connectionType==="onConnect"){
        connection.connectDb(async (err)=>{
            if (err) throw err
            else{
               const db = connection.getDb()
               db.collection("registration").updateOne({"userName":user},{$set:{"status":"available","socketId":socketId}},(err,doc)=>{
                if(err) {
                    throw err
                }
                // else if(doc===null){
                //     errors.userName = "userName don't exist"
                //     return res.json({errors:errors})
                // }
                else{
                    getUsers(socket)
                }
            })
        }
    })
    

    }
    else if (connectionType==="onDisconnect"){
        
        
        connection.connectDb(async (err)=>{
            if (err) throw err
            else{
               const db = connection.getDb()
               db.collection("registration").updateOne({"socketId":socketId},{$set:{"status":"notAvailable","socketId":null}},(err,doc)=>{
                if(err) {
                    throw err
                }
                // else if(doc===null){
                //     errors.userName = "userName don't exist"
                //     return res.json({errors:errors})
                // }
                else{
                    // console.log("status updated to not available");
                }
            })
        }
    })
    }
    
}