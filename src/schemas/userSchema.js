import joi from "joi";
const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(4),
  confirm_password: joi.ref("password"),
});

export default userSchema;
