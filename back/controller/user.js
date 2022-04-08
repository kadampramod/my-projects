
const user = require('../Models/user');

exports.logincontroller = (req,res) => {
    const { email, password} = req.body;
    let message , isauthenticated;
    user.find({ email, password})
    
    .then(response => {
        if(response.length == 0){
            isauthenticated = false;
            message = "User Not Authenticated"

        }
        else{
            isauthenticated = true;
                message = "User Authenticated"

        }
        res.status(200).json({
            
            message,
            isauthenticated,
            User:response
        })
    })
    .catch(err => {
        res.status(500).json({error:err}) 
      }  )
}

exports.usersignup=(req,res) => {
    const {email, password,firstname,lastname}  = req.body

    let userobj = new user({email, password, firstname, lastname});
        userobj.save()
        .then(response  => { res.status(200).json({
            message:'User signed up ',
           
            User:response
        })
     } )
       .catch( err => {
        res.status(500).json({error:err}) 
         }  )
}
