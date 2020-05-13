import React from 'react';

import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import Home from './components/Home';
import UserRegistration from './components/UserRegistration';
import Login from './components/Login';



function App() {
  return (
    <div className="App">
            <Router>
              
              <Switch>
                {/* user */}
                <Route exact path='/' component={Login} /> 
                <Route exact path='/userRegistration' component={UserRegistration} />
                <Route exact path='/home' component={Home} /> 
                </Switch>
            </Router>
            
         
    </div>
  );
}

export default App;














// import React, { Component } from 'react'
// import io from 'socket.io-client'
// const socketUrl="http://localhost:4001"
// export default class App extends Component {
//   constructor(props){
//     super(props)
//     this.state={
//       userName:null,
//       user:null,
//       selectedUser:null,
//       users:[],
//       socket:null,
//       message:null,
//       messages:[],
//       response:null
//     }
//   }
//   componentWillMount(){
//     const socket =io(socketUrl)
//     socket.on('message',data=>{
//       let array=[...this.state.messages,data]
//       this.setState({messages:array})
//     })
//     socket.on('users',users=>{
//       this.setState({users})
//       console.log(this.state.users);
      
//     })
    
    
//     this.setState({socket})
//   }
//   handleChange=(e)=>{
//     this.setState({message:e.target.value})
//   }
//   handleSubmit = (e)=>{
//     e.preventDefault()
//     let array=[...this.state.messages,{msg:this.state.message,socketId:this.state.socket.id}]
//     this.setState({messages:array})
//     this.state.socket.emit('new-message',{msg:this.state.message,socketId:this.state.socket.id,toSocketId:this.state.selectedUser.socketId})
//     this.setState({message:""})
//   }
//   handleChangeUserName =(e)=>{
//     this.setState({user:e.target.value})
//   }
//   handleSubmitUserName=(e)=>{
//     e.preventDefault()
//     this.state.socket.emit('verifyUser',{userName:this.state.user,socketId:this.state.socket.id})
//     this.setState({userName:this.state.user})
//   }
//   display  =()=>{
//      if(this.state.selectedUser){
//        return "none"
//      }
//      else{
//        return "block"
//      }
      
//   }
//   render() {
//     const messages = this.state.messages.map(msg=><div>
//                                                     {msg.socketId===this.state.socket.id ? (<div>Me:{msg.msg}</div>):(<div>He:{msg.msg}</div>)}
//                                                   </div>)
//     const users = this.state.users.map(user=><div onClick={()=>{this.setState({selectedUser:user})}}>{user.userName}<hr/></div>)
    
//     return (
//       <div >
//         {!this.state.userName ? (<div>
//                 <form onSubmit={this.handleSubmitUserName}>
//                   <input type="text" placeholder="Enter UserName" value={this.state.user} onChange={this.handleChangeUserName} />
//                 </form>
//             </div>)
//             :
//             (<div style={{"display":()=>this.display()}}>
//               <button onClick={()=>this.state.socket.emit('getUsers')}>get users</button>
//               {users}
//             </div>)
            
//         }
//         {this.state.selectedUser ? (<div>
                                
//                                   <br />
//                                   <h1>{this.state.selectedUser.userName}</h1>
//                                   <hr />
//                                   {messages}
                                
//                                   <form onSubmit={this.handleSubmit}>
//                                   Type your message   <input type="text" placeholder="Enter message" value={this.state.message} onChange={this.handleChange} />
//                                   </form>
//                                 </div>)
//                                   :
//                                   null
//         }
//       </div>
//     )
//   }
// }





