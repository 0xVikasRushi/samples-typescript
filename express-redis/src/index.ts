import express from "express";
import {
  connectRedis,
  getValueFromRedis,
  setValueFromRedis,
} from "./store/redis-server";
const app = express();
const port = 3000;

connectRedis();
setValueFromRedis("PING", "PONG");

app.get("/", async (req, res) => {
  const value = await getValueFromRedis("PING");
  res.send("Hello World!  " + value);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
