import userSchema from "../schemas/userSchema.js";

function validateUser(req, res, next) {
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: true });

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(401);
  }
  next();
}

export default validateUser;
