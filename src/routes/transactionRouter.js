import express from "express";
import {
  creditTransaction,
  debitTransaction,
  getTransactions,
} from "../controllers/transactionController.js";
import validateTransaction from "../middlewares/transactionSchemaValidationMiddleware.js";

const transactionRouter = express.Router();

transactionRouter.get("/transactions", getTransactions);
transactionRouter.post("/credit", validateTransaction, creditTransaction);
transactionRouter.post("/debit", validateTransaction, debitTransaction);

export default transactionRouter;
