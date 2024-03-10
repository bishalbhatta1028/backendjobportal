import JWT from "jsonwebtoken";
import { RECRUITER, APPLICANT } from "../constant/role.js";
const userAuth = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({
      msg: "auth failed",
    });
  }
  const token = authHeader.split(" ")[1];
  //console.log(token);

  try {
    let payload = JWT.verify(token, process.env.JWT_SECRET);

    console.log({ payload });
    // req.role = { role: payload.role };
    // console.log(req.role);
    //req.user = { user: payload.user };
    req.user = { userId: payload.userId, role: payload.role };
    // console.log(req.userId.user);
    if (req.user.role === RECRUITER || APPLICANT) {
      next();
    } else {
      res.status(403).send({
        msg: "forbidden",
      });
    }
  } catch (err) {
    next(err);
    // console.log(err);
  }
};
export default userAuth;
