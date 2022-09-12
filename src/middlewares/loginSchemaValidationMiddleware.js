import loginSchema from "../schemas/loginSchema.js";

function validateLogin(req, res, next) {
  const user = req.body;
  const validation = loginSchema.validate(user, { abortEarly: true });

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(401);
  }
  next();
}

export default validateLogin;
