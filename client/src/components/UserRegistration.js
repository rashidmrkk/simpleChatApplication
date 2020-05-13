import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios'
export default class UserRegistration extends Component {
    constructor() {
        super();
        this.state = {
            fullName : '',
            userName : '',
            password : '',
            confirmPassword : '',
            errors: {},
        };
      }
      handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
      handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
          userName: this.state.userName,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          fullName :  this.state.fullName
        };
    axios
    .post('/signup', newUserData)
    .then((res) => {
        
        console.log(res.data.errors)
        console.log(res)
      res.data.result ? 
          this.props.history.push({
            pathname:'/home',
            state:{user:res.data.result}
          }) : this.setState({
              errors : res.data.errors
          })
    })
    .catch((err) => {
      console.log(err)
      });
    };
    
      
      
    render() {
      const {errors}=this.state
        return (
            <Grid container >
            <Grid item sm />
            <Grid item sm>
              
              <Typography variant="h2" >
                SignUp
              </Typography>
            <form noValidate onSubmit={this.handleSubmit} >
                <TextField 
                  type="text" 
                  label="Full Name" 
                  name="fullName" 
                  onChange={this.handleChange}
                  helperText={errors.fullName}
                  value={this.state.fullName}
                  fullWidth
                  error={errors.fullName ? true : false}
                />
                <TextField 
                  type="UserName" 
                  label="UserName" 
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
                <TextField 
                  type="password" 
                  label="Confirm Password" 
                  name="confirmPassword" 
                  onChange={this.handleChange}
                  helperText={errors.confirmPassword}
                  value={this.state.confirmPassword}
                  fullWidth
                  error={errors.confirmPassword ? true : false}
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
              SignUp
               
    </Button>
    </form>
    </Grid>
        <Grid item sm />
      </Grid>
        )
    }
}
