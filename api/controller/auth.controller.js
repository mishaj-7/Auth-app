import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { erroHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password:hashedPassword });

    try {
        await newUser.save();
        res.status(201).json({ message: "user added succesfully" });
    } catch (err) {
        next(err)
    }
    
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(erroHandler(404, 'user not found'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
       // console.log(password + "\n" + validPassword + validUser.password);
        if (!validPassword) return next(erroHandler(401, 'wrong credential'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest } = validUser._doc;

        const expiryDate = new Date(Date.now() + 3600000); // 1hour
        
        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest);
    } catch (err) {
        console.log("helo")
        next(err)
     }
}