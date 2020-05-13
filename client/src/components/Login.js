import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName : '',
            password : '',
            errors: {},
            loading:false
        };
      };
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };


      handleSubmit = (event) => {
        console.log("submit clicked");
        
        event.preventDefault();
        const userData = {
          userName: this.state.userName,
          password: this.state.password
        };
        axios.post('/login',userData)
        .then( res =>{
          if(res.data.result){
            this.props.history.push({
              pathname:'/home',
              state:{user:res.data.result}
            })
          }
          else if(res.data.errors){
            this.setState({errors:res.data.errors})
          }
        })
    };
      
    render() {
        const { errors } = this.state;
        return (
            <Grid container >
              <Grid item sm />
                <Grid item sm>
                  <Typography variant="h2" >
                    Login
                  </Typography>
                  <form noValidate onSubmit={this.handleSubmit} >
                    <TextField 
                      type="userName" 
                      label="userName" 
                      name="userName" 
                      onChange={this.handleChange}
                      helperText={errors.userName}
                      value={this.state.userName}
                      fullWidth
                      error={errors.userName ? true : false}
                    />
                    <TextField 
                      type="password" 
                      label="Password" 
                      name="password" 
                      onChange={this.handleChange}
                      helperText={errors.password}
                      value={this.state.password}
                      fullWidth
                      error={errors.password ? true : false}
                    />
                    {errors.general && (
                      <Typography variant="body2" >
                        {errors.general}
                      </Typography>
                    )}
                    <br /><br />
    
                    <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              Login
                    </Button>
                  </form>
                </Grid>
              <Grid item sm />
            </Grid>
        )
    }
}
