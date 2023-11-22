var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const saltRound = 12;
const secretKey = '1@30(8)rety#jbdsj!';

const hashPassword = async(password)=>{
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async(password, hash)=>{
    return bcrypt.compare(password, hash);
}

const createToken = async({userName, id, email, mobile})=>{
    const token = jwt.sign({userName, id, email, mobile}, secretKey, {expiresIn: '1hr'});
    return token;
}

const validate = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        req.token = req.headers.authorization.split(" ")[1];
        jwt.verify(req.token, secretKey, (err, decoded) => {
            if (err) {
                // Token is either expired or invalid
                res.status(401).send({ message: "Token Expired or Invalid" });
            } else {
                // If Token is valid moving to next operation
                next();
            }
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
    }
}

module.exports = {hashPassword, comparePassword, createToken, validate};