// const con = require('../dbConnection')

// const isEmail = (email) => {
//     const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (email.match(regEx)) return true;
//     else return false;
//   };

  // const isExistEmail = (email) => {
  //   con.query('select * from registration where email=?',email, (err,rows) =>{
  //     if(err) throw err;
  //     else if(rows[0]!==null){
  //       return true
  //     }
  //     else return false;      
  //   })
  // }
  
  const isEmpty = (string) => {
    if (string === '') return true;
    else return false;
  };

  
exports.validateSignupData = (data) => {
    let errors = {};
    if (isEmpty(data.UserName)) {
      errors.UserName = 'Must not be empty';
    } 
    // if(isExistEmail(data.email)){ 
    //   errors.email = 'Email already registered'
    // }
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = 'Passwords must match';
    
    // if(isExistMobileNumber(data.mobileNumber)) errors.mobileNumber='Mobile number already registered'
    if (isEmpty(data.fullName)) errors.fullName = 'Must not be empty';
    console.log({errors:errors})
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  
  exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.UserName)) errors.UserName = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
