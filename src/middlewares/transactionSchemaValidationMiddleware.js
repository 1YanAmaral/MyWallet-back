import transactionSchema from "../schemas/transactionSchema.js";

function validateTransaction(req, res, next) {
  const validation = transactionSchema.validate(req.body, { abortEarly: true });

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(401);
  }

  next();
}

export default validateTransaction;
