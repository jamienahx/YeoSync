const userDao = require("../daos/user");
const crypto = require("crypto-js");
const utilSecurity = require("../util/security");



const createUser=async (user)=>{
    // check if user email already exists from the daos file. if user is found, return status 1
    const userFound = await userDao.findOne({ email: user.email })
    console.log("userFound", userFound);
    if (userFound) {
    return { status: 1 }; // user already exists
  }

  // Check password strength
  if (!user.password ||user.password.length < 8) {
    return { status: 2 };
  }

//if the user is not found, hash the password with the salt "abc" and 1000 iterations
        user.password = crypto.PBKDF2(user.password, "abc", { keySize: 8, iterations: 1000 }).toString(crypto.enc.Base64)
    return await userDao.create(user); //create the user in daos
};

const loginUser=async (user)=>{
    //hash the password in the same manner as when the user is created. the iterations salt and everything needs to be identical, otherwise even tho the exact same pw is typed there will be a mismatch in the pw
    user.password = crypto.PBKDF2(user.password, "abc", { keySize: 8, iterations: 1000 }).toString(crypto.enc.Base64)
    console.log("user", user);
     const userFound = await userDao.findOne({ email: user.email, password: user.password });
    if (!userFound) { // not found
        return {
            status: 1,
        };
    }
    //if the user is found, create a payload with the email, name and is_admin
     const payload = { email: user.email, name: userFound.name, is_manager: userFound.is_manager, is_admin: userFound.is_admin };
      // create a token
  const token = utilSecurity.createJWT(payload);
  //update the user record with this new jwt for session tracking
    await userDao.updateOne({ email: user.email }, { jwt: token });
    return {status: 0, jwt: token} //indicates success
}

//added logout user. search the ser via email
const  logoutUser = async (email)=> {
    //clears out the stored jwt token and invalidates their session.
        await userDao.updateOne({email}, { $unset: { jwt: "" }});
          return { status: 0 }; // success
    }

    module.exports = {
  createUser,
  loginUser,
  logoutUser,
};

