import dayjs from "dayjs";
import db from "../db.js";

export async function creditTransaction(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { amount, description } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
      return res.sendStatus(401);
    }

    const newTransaction = {
      amount,
      description,
      type: "credit",
      date: dayjs().format("DD/MM"),
      userId: user._id,
    };
    await db.collection("transactions").insertOne(newTransaction);

    res.status(201).send(newTransaction);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function debitTransaction(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { amount, description } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
      return res.sendStatus(401);
    }

    const newTransaction = {
      amount,
      description,
      type: "debit",
      date: dayjs().format("DD/MM"),
      userId: user._id,
    };
    await db.collection("transactions").insertOne(newTransaction);

    res.status(201).send(newTransaction);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}

export async function getTransactions(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }

    const transactions = await db
      .collection("transactions")
      .find({ userId: session.userId })
      .toArray();

    res.status(200).send(transactions);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
}
