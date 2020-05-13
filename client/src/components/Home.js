import React, { Component } from 'react'
import io from 'socket.io-client'
import MessageContainer from './MessageContainer'
const socketUrl="http://localhost:4001"

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      userName:null,
      user:null,
      selectedUser:null,
      users:[],
      socket:null,
      message:null,
      messages:[],
      response:null
    }
  }
  componentWillUpdate(){
        this.state.socket.emit('updateStatus',({userName:this.props.location.state.user.userName}))
  }
  componentWillMount(){
        this.setState({user:this.props.location.state.user})
        const socket =io(socketUrl)
        socket.emit('updateStatus',({userName:this.props.location.state.user.userName}))
        // socket.emit('users',()=>{
        // })
        socket.on('users',users=>{
          this.setState({users})
        })
        this.setState({socket})
      }
  handleSelectedUser = user =>{
    this.setState({selectedUser:user})
    console.log("got it : "+this.state.socket.id);
    
  }
  render() {
    const {socket} = this.state
    const usersMap = this.state.users.map(user =>
      <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mt-3 mb-3" 
          style={{"background-color":"silver"}}
          onClick={()=>this.handleSelectedUser(user)}
      >
          <h5>{user.name}</h5>
      </div>
  )
    return (
      <div className="container">
        <div className="row">
          <h1 className="col-md-12 mb-7 mt-7" style={{"align":"centre"}}>WELCOME {this.state.user.userName}</h1>
          <div className="col-lg-4 col-md-4">
                    {usersMap}
          </div>
          <div className="col-lg-8 col-md-8 mt-3">
              {this.state.selectedUser!==null ? (<MessageContainer selectedUser={this.state.selectedUser} user={this.state.user} socket={this.state.socket}/>) :null}
          </div>
        </div>
        
      </div>
    )
  }
}










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
//     this.setState({user:this.props.location.state.user})
//     const socket =io(socketUrl)
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