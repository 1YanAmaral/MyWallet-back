import joi from "joi";

function validateTransaction(req, res, next) {
  const transactionSchema = joi.object({
    amount: joi.number().precision(2).required(),
    description: joi.string().required(),
  });

  const validation = transactionSchema.validate(req.body, { abortEarly: true });

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(401);
  }

  next();
}

export default validateTransaction;
