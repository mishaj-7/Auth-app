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
        console.log("error")
        next(err)
    }
};

export const google = async (req, res, next) => {
    //console.log(req.body.name);
    try {
        const user = await User.findOne({ email: req.body.email })
        //console.dir(user);
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 houre token stores in cookie brwoser
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            }).status(200).json(rest)
        } else {
            const generatedPasswrod =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPasswrod, 10)
            const newUser = new User({
                username:
                    req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            }).status(200).json(rest);
        }
    } catch (err) {
        next(err);
        //console.log(err);
    }
}