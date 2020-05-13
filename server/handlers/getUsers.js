const connection = require('../mongoDb/connection')

exports.getUsers = (socket)=>{
   
    
    connection.connectDb(async (err)=>{
        if (err) throw err
        else{
           const db = connection.getDb()
           db.collection("registration").find({"status":"available"}).toArray((err,doc)=>{
            if(err) {
                throw err
            }
            // else if(doc===null){
            //     errors.userName = "userName don't exist"
            //     return res.json({errors:errors})
            // }
            else{
                
                
                
                const users = doc
                socket.emit('users',users)
            }
        })
    }
})
}