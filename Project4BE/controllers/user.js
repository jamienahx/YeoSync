const userModel = require("../models/user");




const createUser =async (req, res) =>{
const modelResp = await userModel.createUser(req.body);
    if (modelResp.status === 1) {
        return res.status(400).json({message: "User already exists"});
    } else if (modelResp.status && modelResp.status === 2) {
        return res.status(400).json({message: "Weak password"});
    } else {
        return res.json({message: "User created successfully"});
    }

}

const loginUser =async(req, res) =>{
    const modelResp = await userModel.loginUser(req.body); //calls loginuser from models file
    if (modelResp.status === 1) {
        return res.status(400).json({message: "Username or password is wrong"});
    } else if (modelResp.status === 0) {
        return res.json({message: "Login successful", jwt: modelResp.jwt});
    } 
}


const logoutUser=async(req, res) => {
await userModel.logoutUser(req.user.email);
  return res.json({ message: "Logout successful" });

}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
};