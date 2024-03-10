import User from "../model/User.js";
import JWT from "jsonwebtoken";

export const getUserController = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.user.userId,
    });

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      res.status(400).send({ msg: "Please enter the required fields" });
    }
    const user = await User.findOne({
      _id: req.user.userId,
    });

    user.name = name;
    user.email = email;
    user.role = role;

    res.send({
      user,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};
