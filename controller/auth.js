const jwt = require('jsonwebtoken');
let users = [];

const secretKey = 'verySec'

const authenticatedUser = (username,password)=>{ //returns boolean
    let authed = users.filter((i)=> i?.username);
    if(!authed){
        return false
    } else{
      return authed.password === password ? true : false
    }
}
exports.loginUser = async(req,res)=>{
try {
    const {username, password} = req.body;
    let isExist = users.filter((i)=> i?.username === username);
    if(!isExist.length){
        return res.status(400).json({message:'UserName or Password not match'})
    } else{
        if(isExist[0]?.password === password){
            req.session.username = username
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
            return res.status(200).json({token})
        } else{
            return res.status(400).json({message:'UserName or Password not match'})
        }
    }

} catch (error) {
    res.status(500).json({message:'Something Went Wrong'})
    console.log(error)
}
}

exports.registerUser = async(req,res)=>{
    try {
        const {username, password} = req.body;
        let isExist = users.filter((i)=> i?.username === username);
        console.log(username, password, users)

        if(!isExist.length){
            users.push({username, password});
            return res.status(201).json({message:'Successfully Created'})
        } else{
            res.status(400).json({message:'UserName is Exist'})
        }
       
    } catch (error) {
        res.status(500).json({message:'Something Went Wrong'})
        console.log(error)
    }
    }