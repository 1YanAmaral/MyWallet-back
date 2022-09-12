import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

app.use(transactionRouter);

app.listen(5000, () => console.log("LISTENING ON 5000"));
