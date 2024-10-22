import express from "express";
import { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

const DB: { [key: number]: [string, boolean] } = {};
const INDEX_TODO_NAME = 0;
const INDEX_TODO_COMPLETION = 1;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  // console.log("server ping");
  res.send("Welcome to the server!");
});

// Send over all the todos
app.get("/allTodos", (req: Request, res: Response) => {
  // console.log("get all todos");

  res.send(JSON.stringify(DB));
});

app.put("/todo", (req: Request, res: Response) => {
  // console.log("put todo");

  const todo = req.body.todo;
  const time = Date.now();
  DB[time] = [todo, false];

  console.log(DB);

  res.status(200).json(DB);
});

app.patch("/todo", (req: Request, res: Response) => {
  // console.log("update todo");

  const timestamp = req.body.timestamp;
  const todoName = req.body.todoName;
  const completed = req.body.completed;

  if (todoName) DB[timestamp][INDEX_TODO_NAME] = todoName; // Edit the todo name if it exists
  DB[timestamp][INDEX_TODO_COMPLETION] = completed;

  res.status(200).json(DB[timestamp]);
});

app.delete("/:timestamp", (req: Request, res: Response) => {
  // console.log("delete todo");

  const timestamp = parseInt(req.params.timestamp);
  // console.log("delete todo at timestamp:", timestamp);

  delete DB[timestamp];
  res.status(200).json(DB);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})