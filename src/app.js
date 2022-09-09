import express from "express";
import cors from "cors";
import joi from "joi";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
  db = mongoClient.db("mywallet");
});

app.post("/sign-up", async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const user = {
    name,
    email,
    password,
    confirm_password,
  };

  const passwordHash = bcrypt.hashSync(password, 10);

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
    const repeatedEmail = await db
      .collection("users")
      .find({ email: user.email })
      .toArray();
    if (repeatedEmail.length !== 0) {
      return res.status(401).send("email já existe");
    }

    await db.collection("users").insertOne({
      ...user,
      password: passwordHash,
      confirm_password: passwordHash,
    });
    res.status(201).send("OK");
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(404).send("Usuário ou senha não encontrada");
    }

    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.status(404).send("Usuário ou senha não encontrada");
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

app.listen(5000, () => console.log("LISTENING ON 5000"));
