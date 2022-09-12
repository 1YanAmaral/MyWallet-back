import joi from "joi";

const transactionSchema = joi.object({
  amount: joi.number().precision(2).required(),
  description: joi.string().required(),
});

export default transactionSchema;
