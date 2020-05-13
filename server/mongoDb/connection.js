
const {MongoClient} = require('mongodb')
const uri ="mongodb://localhost:27017/chat_app"
const dbName = "chat_app"
let _db
const connectDb = async (callback) =>{
    try{
        MongoClient.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true },(err,client)=>{
            if(!err){
                _db=client.db()
                
            }
            return callback(err)
        })
    }catch(e){
        throw e
    }
}
const getDb =()=>_db
const closeConnection = ()=> _db.close()
module.exports = {connectDb,getDb,closeConnection}