import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
  const { name, email, password, confirm_password } = req.body;
  const user = {
    name,
    email,
    password,
    confirm_password,
  };

  const passwordHash = bcrypt.hashSync(password, 10);

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
}

export async function signIn(req, res) {
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

    const token = uuid();
    await db.collection("sessions").insertOne({
      userId: user._id,
      token,
    });
    delete user.password;
    delete user.confirm_password;
    return res.send({ user, token }).status(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
