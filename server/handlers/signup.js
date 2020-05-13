const {validateSignupData} = require('../validators')
// const con = require('../dbConnection')
const connection = require('../mongoDb/connection')
const crypto = require('crypto')

  // const isExistMobileNumber = (mobileNumber) => {
  //   con.query('select * from registration where phone=?',mobileNumber, (err,rows) =>{
  //     if(err) throw err;
  //     else if(rows[0]!==null){
  //       return true
  //     }
  //     else return false;      
  //   })
  // }
exports.signup = (req,res) => {
    const newUserData = {
          userName: req.body.userName,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          fullName:  req.body.fullName,
         
    }
    console.log({datarecivedforsignup:newUserData})
    const {valid, errors} = validateSignupData(newUserData);
    console.log(valid,errors)
    if (!valid) {
      console.log("not valid");
      
      return res.json({errors:errors});
    }
    else{
        // const sql = "select reg_id from registration where email = '"+newUserData.email+"'"
        connection.connectDb(async (err)=>{
          if (err) throw err
          else{
             const db = connection.getDb()
            db.collection("registration").findOne({"userName":newUserData.userName},(err,doc)=>{
               if(err) throw err
               else if(doc!==null){
                 console.log("error");
                 
                errors.userName = "username already registered"
                return res.json({errors:errors})
               }
               else{
                var salt = crypto.randomBytes(16).toString('hex'); 
                var hash = crypto.pbkdf2Sync(newUserData.password,salt,1000, 64, `sha512`).toString(`hex`);
                
               }
               db.collection("registration").insertOne({"name":newUserData.fullName,
                                                        "userName":newUserData.userName,
                                                        "password_salt":salt,
                                                        "password_hash":hash,
                                                        "status":"notAvailable",
                                                        "socketId":null
                                                        
                                                       
                                                      },(err,result)=>{
                                                        if(err) throw err
                                                        else{
                                                          
                                                          userData={
                                                            userName:newUserData.userName,
                                                            fullName:newUserData.fullName,
                                                            reg_id:result.insertedId
                                                          }
                                                          console.log("inserted to registration");
                                                          
                                                          return res.json({result:userData})
                                                        }
                                                       




                                                      })
            })
          }
        })
    }
}


        // con.query(sql,(err,rows) => {
        //   if(err){
        //     throw err;
        //   }
        //   else if(Object.keys(rows).length!==0) {
        //     errors.email = "Email already registered"
        //     return res.json({errors:errors})
        //   }
        //   else{
        //     var salt = crypto.randomBytes(16).toString('hex'); 
        //     var hash = crypto.pbkdf2Sync(newUserData.password,salt,1000, 64, `sha512`).toString(`hex`);
        //     let timestamp = Date.now()
        //     con.query('insert into registration(email,phone,salt,hash,registration_date,user_type)values(?,?,?,?,?,?)',[newUserData.email,newUserData.mobileNumber,salt,hash,timestamp,1],(err,rows) => {
        //       if(err){
        //         throw err
        //       }
        //       else{
        //         const reg_id = rows.insertId
        //         const userData = {
        //           email:newUserData.email,
        //           firstName:newUserData.firstName,
        //           secondName:newUserData.secondName,
        //           mobileNumber:newUserData.mobileNumber,
        //           user_type:1,
        //           reg_id:reg_id
        //         }
        //         const sql = "select * from medplus.address where reg_id="+reg_id
        //         con.query(sql,(err,rows)=>{
        //           if(err) throw err
        //           else if(Object.keys(rows).length===0) {
                    
        //             return res.json(userData)
        //           }
        //           else{
        //             userData.line1=rows[0].line1
        //             userData.line2=rows[0].line2
        //             userData.country=rows[0].country
        //             userData.state=rows[0].state
        //             userData.pincode=rows[0].pincode
        //             return res.json(userData)
        //           }
        //         })
                
        //       }
        //   })
        //    }
        //   })
//     }
// }