const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");


const register = async(req, res) => {
    const {username,password, role} = req.body;
    try{
        //hash password
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = User({
            username,
            password:hashPassword,
            role,

        });
        await newUser.save();
        res.status(201).json({message:`user with ${username}registered sucessfully`})
        
    } catch (error) {
        console.log(error);
        res
        .status(500)
        .json({message: `user with ${username} is not register`})
    }
};

const login = async(req, res) => {
    const {username, password} = req.body;

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({message: "user not found"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: `Invalid Password`});
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},process.env.JWT_SECRET,
            {
                expiresIn: "2h",
            }
        );
        return res.status(200).json({token});
    } catch(error) {

    console.log(error);
    res.status(500).json({message: `error failed to login due to ${error}`});
}

};

module.exports = {
    register,
    login
};
