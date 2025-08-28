var jwt = require('jsonwebtoken');



 const createJWT = (payload) =>{
    return jwt.sign(
        // data payload
        payload ,
        process.env.SECRET, // key (assymetric or symmetric)
        { expiresIn: "24h" }
      );
}

const getExpiry = (token)=> {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    return exp
}

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
    createJWT,
    getExpiry,
    verifyJWT
}