import React, { Component } from 'react'
import axios from 'axios'
export default class MessageContainer extends Component {
    constructor(props){
        super(props)
        this.state={
            messages:[],
            message:null,
            user:null,
            selectedUser:null,
            socket:null
        }
    }
    componentWillMount(){
        
        
        this.setState({user:this.props.user,selectedUser:this.props.selectedUser})
        const {socket,selectedUser,user} =this.props
        // socket.emit('getAllMessages',{to:selectedUser,from:user})
        console.log(selectedUser.userName,user.userName);
        
        axios.post('/getAllMessages',{to:selectedUser.userName,from:user.userName})
            .then(res=>{
                this.setState({messages:res.data})
            })
        socket.on('message',(msg)=>{
            this.setState({messages:[...this.state.messages,msg]})
        })
    }
    handleChange=(e)=>{
        this.setState({message:e.target.value})
        
    }

    handleMessageSubmit =(e)=>{
        e.preventDefault()
        const {socket} =this.props
        var mess = {msg:this.state.messages}
        // const newMessage = [...this.state.messages,mess]
        // this.setState({messages:this.state.messages.concat([mess])})
        socket.emit('message',{sender:this.state.user.userName,msg:this.state.message,to:this.state.selectedUser,from:this.state.user})
        // this.setState({message:null})
    }
    render() {
        const {selectedUser,socket} = this.props
        const mapMessages = this.state.messages.map(msg=>
                <div>
                    {(msg.sender===this.state.user.userName) ? (<h5>Me {msg.msg}</h5>):(<h5>He {msg.msg}</h5>)}
                </div>
            )
        return (
            <div >
                <h1>CHAT WITH {selectedUser.name.toUpperCase()}</h1>
                {mapMessages}
                <form onSubmit={this.handleMessageSubmit}>
                    <input type="text" 
                        placeholder="type message" 
                        name="message" 
                        value={this.state.message} 
                        onChange={this.handleChange} 
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }
}
