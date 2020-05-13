
const connection = require('../mongoDb/connection')

exports.getMessages = (req,res)=>{
    const dataFrom= req.body.from
    const dataTo= req.body.to
    
    console.log("get message datas"+dataTo,dataFrom);
    
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
           db.collection("messages").findOne({"from":from,"to":to},(err,doc)=>{
            if(err) {
                throw err
            }
            else if(doc===null){
               console.log("no messages");
               
            }
            else{
                console.log("**************messages get*******************");
                // socket.emit('message',doc.messages)
                console.log(doc);
                return res.json(doc.messages)
            }
        })
    }
})
}