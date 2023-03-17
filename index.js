import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
import { ObjectId } from "mongodb";
import cors from "cors";
const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");
app.use(cors());
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨");
});
//add income
app.post(
  "/income/addincome",
  express.json(),
  async function (request, response) {
    const data = request.body;
    const income = await client.db("web").collection("income").insertOne(data);
    response.send(income);
  }
);
//add expense
app.post(
  "/expense/addexpense",
  express.json(),
  async function (request, response) {
    const data = request.body;
    const expense = await client
      .db("web")
      .collection("expense")
      .insertOne(data);
    response.send(expense);
  }
);
//get income
app.get("/income", async function (request, response) {
  const result = await client.db("web").collection("income").find({}).toArray();
  response.send(result);
});
//get expense
app.get("/expense", async function (request, response) {
  const result = await client
    .db("web")
    .collection("expense")
    .find({})
    .toArray();
  response.send(result);
});

app.get("/income/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("web")
    .collection("income")
    .findOne({ _id: new ObjectId(id) });
  response.send(result);
});
app.get("/expense/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("web")
    .collection("expense")
    .findOne({ _id: new ObjectId(id) });
  response.send(result);
});

//edit income
app.put("/income/:id", express.json(), async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const result = await client
    .db("web")
    .collection("income")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  response.send(result);
});
app.put("/expense/:id", express.json(), async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  const result = await client
    .db("web")
    .collection("expense")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  response.send(result);
});

//delete income
app.delete("/income/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("web")
    .collection("income")
    .deleteOne({ _id: new ObjectId(id) });
  response.send(result);
});
app.delete("/expense/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("web")
    .collection("expense")
    .deleteOne({ _id: new ObjectId(id) });
  response.send(result);
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
