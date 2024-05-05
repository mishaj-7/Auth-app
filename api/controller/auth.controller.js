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
        if (!validPassword) return next(erroHandler(401, 'wrong credential'));
         
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(validUser)
    } catch (err) {
        console.log("helo")
        next(err)
     }
}