import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/cars/:make", (req: Request, res: Response) => {
  res.send("");
});

app.get("/cars/:model", (req: Request, res: Response) => {
  res.send("");
});

app.get("/cars/:trim", (req: Request, res: Response) => {
  res.send("");
});

app.get("/models/:make", (req: Request, res: Response) => {
  res.send("");
});

app.get("/trims/:model", (req: Request, res: Response) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
