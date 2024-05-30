import { erroHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'

export const test = (req, res) => {
  res.json({
    message: "Api is working fine",
  });
};

// update user function

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(erroHandler(401, "no authority do such actions"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        }
      },
      {new:true} // this line give updated document instead of old orginal document so user can see the change

    );
    
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  }
  catch (err) {
    next(err);
  }
};
