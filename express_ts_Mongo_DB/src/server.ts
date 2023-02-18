import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import Task from "./Task";

const app = express();

app.use(bodyparser.json());

app.use(cors({ origin: "*" }));

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://127.0.0.1:27017/tasks");
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to DB"));

app.get("/tasks", async (req: Request, res: Response) => {
  try {
    console.log(Task);
    const filter = {};
    const all = await Task.find(filter);
    res.send(all);
  } catch (error) {
    throw error;
  }
});

app.post(`/add`, async (req: Request, res: Response) => {
  const value = req.body.taskTitle;
  try {
    await Task.create({ title: value });
  } catch (error) {
    throw error;
  }
});

app.delete(`/tasks/:id`, async (req: Request, res: Response) => {
  const value = req.params.id;
  try {
    await Task.deleteOne({ _id: value });
  } catch (error) {
    throw error;
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

app.listen(3004, () => {
  console.log("Application started on port 3004!");
});
