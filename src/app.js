import express from "express";
import cors from "cors";
import joi from "joi";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
  db = mongoClient.db("mywallet");
});

app.post("/cadastro", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const user = {
    name,
    email,
    password,
    confirm_password,
  };

  const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(4),
    confirm_password: joi.ref("password"),
  });

  const validation = userSchema.validate(user, { abortEarly: true });

  if (validation.error) {
    console.log(validation.error.details);
    return res.sendStatus(401);
  }

  try {
    await db.collections("users").insertOne(user);
    res.status(201).send("OK");
  } catch (error) {
    res.send(error);
  }
});

app.listen(5000, () => console.log("LISTENING ON 5000"));
