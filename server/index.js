
// const express =  require('express')
// const app = express();
// const bodyParser = require('body-parser');
// const http =require('http').createServer(app)
// var allowedOrigins = 'http://localhost:3000/';
// const io = require('socket.io')(http)
// io.set('origins', 'http://localhost:3000');
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });

// const {signup} = require('./handlers/signup')
// const {login} = require('./handlers/login')
// const {getUsers} = require('./handlers/getUsers')

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.post('/login',login)
// app.post('/signup',signup)
// // var sio_server = io(http, {
// //     origins: allowedOrigins
// // });

// io.on('connection',(socket)=>{
//     console.log("a user connected");
//     console.log(socket.id);
//     // socket.on('chat',(msg)=>{
//     //     console.log(msg);
//     //     io.emit('connect',msg)
//     // })
//     // socket.on('new-message',data=>{
//     //     console.log("got new message");
//     //     console.log("tosocket id : " + data.toSocketId);
        
//     //     socket.broadcast.to(data.toSocketId).emit('message',data)
//     //     console.log("emitted message");
//     // })
//     // socket.on('verifyUser',data=>{
//     //     users.push(data)
//     // })
//     socket.on('getUsers',()=>{
//         let users = getUsers()
//         socket.emit('users',users)
//     })
    
//     socket.on('disconnect',()=>{
//         console.log("user disconnected");
        
//     })
    
// })


// app.listen(4001,()=>{
//     console.log('listening on 4001')
// })


























const app= require('express')();
const bodyParser = require('body-parser');
const http =require('http').createServer(app)
const io = require('socket.io')(http)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const {signup} = require('./handlers/signup')
const {login} = require('./handlers/login')
const {getUsers} = require('./handlers/getUsers')
const {addMessage} = require('./handlers/addMessage')
const {getMessages} = require('./handlers/getMessages')

const {updateUserStatus} = require('./handlers/updateUserStatus')
app.post('/login',login)
app.post('/signup',signup)
app.post('/getAllMessages',getMessages)
// var users = []
// app.get('/',(req,res)=>{
//     res.send('<h1>hello world</h1>')
// })
io.on('connection',(socket)=>{
    console.log("a user connected");
    socket.on('updateStatus',(user)=>{
        const connection = "onConnect"
        updateUserStatus(socket.id,user.userName,connection,socket)
    })
    
    // socket.on('chat',(msg)=>{
    //     console.log(msg);
    //     io.emit('connect',msg)
    // })
    
    socket.on('message',(data)=>{
        
        const to = data.to.socketId
        
        
        const from = data.from.socketId
        socket.broadcast.to(to).emit('message',{sender:data.sender,msg:data.msg})
        socket.emit('message',data)
        
        const users = addMessage(data,socket)
        
    })
    
    // socket.on('new-message',data=>{
    //     console.log("got new message");
    //     console.log("tosocket id : " + data.toSocketId);
        
    //     socket.broadcast.to(data.toSocketId).emit('message',data)
    //     console.log("emitted message");
    // })
    // socket.on('verifyUser',data=>{
    //     users.push(data)
    // })
    // socket.on('getUsers',()=>{
    //     socket.emit('users',users)
    // })
    
    socket.on('disconnect',()=>{
        console.log("id"+socket.id);
            const connection = "onDisconnect"
            updateUserStatus(socket.id,null,connection)
        
        
    })
    
})
http.listen(4001,()=>{
    console.log("listening on 4001");
    
})