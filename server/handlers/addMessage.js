
const connection = require('../mongoDb/connection')

exports.addMessage = (data,socket)=>{
    const dataFrom= data.from.userName
    const dataTo= data.to.userName
    var from = null
    var to = null
    if(dataTo>dataFrom){
        from = dataTo
        to = dataFrom
    }
    else{
        to = dataTo
        from = dataFrom
    }
    connection.connectDb(async (err)=>{
        if (err) throw err
        else{
           const db = connection.getDb()
           db.collection("messages").updateOne({"from":from,"to":to},{$push:{messages:{msg:data.msg,sender:data.from.userName}}},{upsert:true},(err,doc)=>{
            if(err) {
                throw err
            }
            else{
                console.log("inserted");
                
                // console.log(doc);
                
            }
        })
    }
})
}