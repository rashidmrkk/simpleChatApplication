const {validateLoginData} = require('../validators')
// const con = require('../dbConnection')
const connection = require('../mongoDb/connection')
const crypto = require('crypto')
exports.login = (req,res)=>{
    
    const userData = {
        userName: req.body.userName,
        password: req.body.password,
    }
  console.log({datarecivedforlogin:userData})
  const {valid, errors} = validateLoginData(userData);
    console.log(valid,errors)
    if (!valid) return res.json({errors:errors});
    else{
        connection.connectDb(async (err)=>{
            if (err) throw err
            else{
               const db = connection.getDb()
               db.collection("registration").findOne({"userName":userData.userName},(err,doc)=>{
                if(err) {
                    throw err
                }
                else if(doc===null){
                    errors.userName = "userName don't exist"
                    return res.json({errors:errors})
                }
                else{
                    const loginUser = {
                        reg_id:doc._id,
                        userName : doc.userName,
        
                        name:doc.name,
                        
                    }
                var salt = doc.password_salt;
                var hash = crypto.pbkdf2Sync(userData.password,salt,1000, 64, `sha512`).toString(`hex`);
                if(doc.password_hash === hash){
                    console.log("successfully logged in")
                    return res.json({result:doc})
                }
                else{
                        
                        errors.password = "password don't match"
                        return res.json({errors:errors})
                }
                }
            })
        }
    })
    }
}
   
//         const sql = "select reg_id,salt,hash,email,phone,user_type from registration where email='"+userData.email+"'";
//         con.query(sql,(err,rows)=>{
//             if(err){
//                 console.log("error");
//             }
//             else if(Object.keys(rows).length===0){
//                 errors.email = "email don't exist"
//                 return res.json({errors:errors})
//             }
//             else{
//                 const loginUser = {
//                     reg_id:rows[0].reg_id,
//                     email : rows[0].email,
//                     phone : rows[0].phone,
//                     user_type : rows[0].user_type
//                 }
                
//                 var salt = rows[0].salt;
//                 var hash = crypto.pbkdf2Sync(userData.password,salt,1000, 64, `sha512`).toString(`hex`);
//                 if(rows[0].hash === hash){
//                     console.log("successfully logged in")
//                     if(loginUser.user_type===1){
//                         const sql = "select line1,line2,state,country,pincode,first_name,last_name,blood_group,whish_to_donate_blood from medplus.user_registration left join medplus.address on medplus.user_registration.reg_id=medplus.address.reg_id where medplus.user_registration.reg_id="+loginUser.reg_id
//                         con.query(sql,(err,rows)=>{
//                             if(err) throw err
//                             else if(Object.keys(rows).length===0){
//                                 return res.json(loginUser)
//                             }
//                             else if (Object.keys(rows).length!==0){
//                                 loginUser.line1=rows[0].line1
//                                 loginUser.line2=rows[0].line2
//                                 loginUser.country=rows[0].country
//                                 loginUser.state=rows[0].state
//                                 loginUser.pincode=rows[0].pincode
//                                 loginUser.first_name=rows[0].first_name
//                                 loginUser.last_name = rows[0].last_name
//                                 loginUser.blood_group = rows[0].blood_group
//                                 loginUser.whish_to_donate_blood = rows[0].whish_to_donate_blood
//                                 return res.json(loginUser)
//                             }
                            
//                         })
//                     }
//                 }
//                 else{
//                     errors.email = "Email or password don't match"
//                     errors.password = "Email or password don't match"
//                     return res.json({errors:errors})
//                 }
//             }
//         })
        
//     }
// }